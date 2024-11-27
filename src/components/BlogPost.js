// src/components/BlogPost.js
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  query,
  collection,
  where,
  orderBy,
  limit, 
  getDocs
} from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';
import {
  Clock,
  Calendar,
  Eye,
  Heart,
  ArrowLeft,
  ArrowRight,
  BookOpen
} from 'lucide-react'; 

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [seriesPosts, setSeriesPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(true);
  const [relatedError, setRelatedError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, 'blogPosts', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const postData = { id: docSnap.id, ...docSnap.data() };
          setPost(postData);

          // 시리즈 포스트 가져오기
          if (postData.series && postData.series.name) {
            const seriesQuery = query(
              collection(db, 'blogPosts'),
              where('series.name', '==', postData.series.name),
              orderBy('series.order', 'asc')
            );
            const seriesSnapshot = await getDocs(seriesQuery);
            const seriesData = seriesSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setSeriesPosts(seriesData);
            const index = seriesData.findIndex(p => p.id === docSnap.id);
            setCurrentIndex(index);

            // 디버깅용 로그
            console.log('Series Posts:', seriesData);
            console.log('Current Index:', index);
          }

          // 조회수 증가
          await updateDoc(docRef, {
            views: increment(1)
          });
        } else {
          console.log('No such document!');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      if (post && post.tags && post.tags.length > 0) {
        try {
          setRelatedLoading(true);
          const relatedQuery = query(
            collection(db, 'blogPosts'),
            where('tags', 'array-contains-any', post.tags),
            where('__name__', '!=', id), // '__name__'을 사용하여 문서 ID 필터링
            orderBy('views', 'desc'),
            limit(4) // 'limit'을 사용하기 위해 임포트함
          );
          const relatedSnapshot = await getDocs(relatedQuery);
          const relatedData = relatedSnapshot.docs
            .filter(doc => doc.id !== id) // 클라이언트 측에서 현재 포스트 제외
            .map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
          setRelatedPosts(relatedData);
          setRelatedLoading(false);
        } catch (error) {
          console.error('Error fetching related posts:', error);
          setRelatedError('관련 포스트를 불러오는 데 오류가 발생했습니다.');
          setRelatedLoading(false);
        }
      } else {
        setRelatedPosts([]);
        setRelatedLoading(false);
      }
    };

    fetchRelatedPosts();
  }, [post, id]); // 'id'를 의존성 배열에 추가

  const handleLike = async () => {
    if (!liked) {
      try {
        const docRef = doc(db, 'blogPosts', id);
        await updateDoc(docRef, {
          likes: increment(1)
        });
        setLiked(true);
        setPost(prev => ({ ...prev, likes: prev.likes + 1 }));
      } catch (error) {
        console.error('Error updating likes:', error);
      }
    }
  };

  const handlePrevious = () => {
    if (seriesPosts && currentIndex > 0) {
      const previousPost = seriesPosts[currentIndex - 1];
      navigate(`/blog/${previousPost.id}`);
    }
  };

  const handleNext = () => {
    if (seriesPosts && currentIndex < seriesPosts.length - 1) {
      const nextPost = seriesPosts[currentIndex + 1];
      navigate(`/blog/${nextPost.id}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Post not found.</h1>
        <Link to="/blog" className="text-secondary hover:underline mt-4 inline-block flex items-center justify-center gap-1">
          <BookOpen className="w-5 h-5" />
          Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <motion.article
      className="py-20 px-6 bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto max-w-4xl relative">
        {/* Navigation Buttons - 페이지 상단 오른쪽 위에 위치 */}
        <div className="absolute top-0 right-0 mt-4 mr-4 flex space-x-2 z-10">
          {post.series && (
            <>
              <motion.button
                onClick={handlePrevious}
                className={`px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2 ${
                  currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={currentIndex === 0}
                whileHover={{ scale: currentIndex === 0 ? 1 : 1.05 }}
                whileTap={{ scale: currentIndex === 0 ? 1 : 0.95 }}
                aria-label="Previous Post"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </motion.button>
              <motion.button
                onClick={handleNext}
                className={`px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center gap-2 ${
                  currentIndex === seriesPosts.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={currentIndex === seriesPosts.length - 1}
                whileHover={{ scale: currentIndex === seriesPosts.length - 1 ? 1 : 1.05 }}
                whileTap={{ scale: currentIndex === seriesPosts.length - 1 ? 1 : 0.95 }}
                aria-label="Next Post"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </>
          )}
        </div>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              {post.category}
            </span>
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="w-4 h-4 mr-1" />
              {post.readTime} min read
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-6 text-gray-900">{post.title}</h1>
          
          {/* Author Info */}
          <div className="flex items-center mb-8">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <p className="font-medium text-gray-900">{post.author.name}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(post.date.seconds * 1000).toLocaleDateString()}
                </span>
                {post.lastUpdated && (
                  <span className="flex items-center">
                    Updated: {new Date(post.lastUpdated.seconds * 1000).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Featured Image */}
          <div className="relative">
            <img
              src={post.image}
              alt={post.thumbnailAlt || post.title}
              className="w-full aspect-video object-cover rounded-xl shadow-lg mb-8"
            />
          </div>

          {/* Engagement Stats */}
          <div className="flex items-center justify-between border-y border-gray-200 py-4">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                {post.views} views
              </span>
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 ${
                  liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                }`}
                aria-label="Like Post"
              >
                <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                {post.likes} likes
              </button>
            </div>
          </div>
        </header>

        {/* Share Buttons */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Share this post</h3>
          <div className="flex gap-4">
            <button
              className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-full flex items-center gap-1"
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
              aria-label="Share on Twitter"
            >
              {/* Twitter 아이콘 */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.43.4a9.14 9.14 0 01-2.88 1.17A4.52 4.52 0 0016.95 0a4.48 4.48 0 00-4.42 4.42c0 .35.04.69.12 1.02A12.94 12.94 0 013 1.16a4.42 4.42 0 00-.61 2.24A4.48 4.48 0 004.84 7a4.48 4.48 0 01-2.04-.56v.06a4.42 4.42 0 003.55 4.35 4.5 4.5 0 01-2.04.08 4.48 4.48 0 004.19 3.12A9.03 9.03 0 012 19.54a12.94 12.94 0 006.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.35-.02-.53A8.36 8.36 0 0023 3z" />
              </svg>
              Share on Twitter
            </button>
            <button
              className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-full flex items-center gap-1"
              onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
              aria-label="Share on LinkedIn"
            >
              {/* LinkedIn 아이콘 */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11.75 20h-3v-10h3v10zm-1.5-11.3c-.966 0-1.75-.785-1.75-1.75s.784-1.75 1.75-1.75 1.75.785 1.75 1.75-.784 1.75-1.75 1.75zm13.25 11.3h-3v-5.604c0-1.337-.025-3.065-1.868-3.065-1.87 0-2.155 1.46-2.155 2.964v5.703h-3v-10h2.879v1.367h.041c.401-.76 1.381-1.562 2.84-1.562 3.038 0 3.603 2.0 3.603 4.606v5.69z" />
              </svg>
              Share on LinkedIn
            </button>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold mb-6">Related Posts</h3>
          {relatedLoading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : relatedError ? (
            <p className="text-red-500">{relatedError}</p>
          ) : relatedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map(relPost => (
                <Link
                  key={relPost.id}
                  to={`/blog/${relPost.id}`}
                  className="block p-4 border rounded-lg hover:bg-gray-50 transition duration-200"
                  aria-label={`Read more about ${relPost.title}`}
                >
                  {relPost.image && (
                    <img
                      src={relPost.image}
                      alt={relPost.thumbnailAlt || relPost.title}
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                  )}
                  <h4 className="text-xl font-medium text-gray-900">{relPost.title}</h4>
                  <p className="text-gray-600 mt-2">{relPost.readTime} min read</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">관련 포스트가 없습니다.</p>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default BlogPost;
