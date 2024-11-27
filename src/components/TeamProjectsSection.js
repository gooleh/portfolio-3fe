// src/components/TeamProjectsSection.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

Modal.setAppElement('#root');

const TeamProjectsSection = () => {
  const [teamProjects, setTeamProjects] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [enlargedImage, setEnlargedImage] = useState(null);

  useEffect(() => {
    const fetchTeamProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'teamProjects'));
        const teamProjectsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          technologies: Array.isArray(doc.data().technologies) ? doc.data().technologies : [],
          features: Array.isArray(doc.data().features) ? doc.data().features : [],
          additionalImages: Array.isArray(doc.data().additionalImages) ? doc.data().additionalImages : [],
        }));
        setTeamProjects(teamProjectsData);
      } catch (error) {
        console.error("Error fetching team projects: ", error);
      }
    };

    fetchTeamProjects();
  }, []);

  const openModal = (project) => {
    setSelectedProject(project);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProject(null);
    setEnlargedImage(null);
  };

  const openEnlargedImage = (imgUrl) => {
    setEnlargedImage(imgUrl);
  };

  const closeEnlargedImage = () => {
    setEnlargedImage(null);
  };

  return (
    <section id="team-projects" className="py-20 px-6 bg-background text-textPrimary">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-center text-primary">Team Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              whileHover={{ translateY: -10 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 text-primary">{project.title}</h3>
                <p className="text-sm text-secondary mb-2">
                  Role: {project.role}
                </p>
                <p className="mb-4 text-textSecondary">{project.description}</p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => openModal(project)}
                    className="flex items-center text-secondary hover:underline font-medium"
                    aria-label={`Learn more about ${project.title}`}
                  >
                    Learn More <FaExternalLinkAlt className="ml-1" />
                  </button>
                  {project.projectUrl && (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary hover:underline font-medium"
                      aria-label={`View ${project.title} Project`}
                    >
                      View Project <FaExternalLinkAlt className="ml-1" />
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary hover:underline font-medium"
                      aria-label={`View ${project.title} Repository`}
                    >
                      View Repo <FaGithub className="ml-1" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Project Details"
          className="bg-white p-8 max-w-6xl w-11/12 mx-auto mt-16 rounded-lg shadow-lg overflow-y-auto max-h-[85vh]"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-40"
        >
          {selectedProject && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold text-primary">{selectedProject.title}</h2>
                <button
                  onClick={closeModal}
                  className="text-secondary hover:text-primary text-2xl"
                  aria-label="Close Modal"
                >
                  &times;
                </button>
              </div>
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-auto aspect-video object-cover mb-6 rounded-lg cursor-pointer"
                onClick={() => openEnlargedImage(selectedProject.image)}
              />
              <p className="mb-4 text-textSecondary">{selectedProject.details}</p>
              
              {selectedProject.technologies.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-primary mb-2">Technologies Used:</h3>
                  <ul className="list-disc list-inside text-textSecondary">
                    {selectedProject.technologies.map((tech, idx) => (
                      <li key={idx}>{tech}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedProject.features.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-primary mb-2">Features:</h3>
                  <ul className="list-disc list-inside text-textSecondary">
                    {selectedProject.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedProject.challenges && (
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-primary mb-2">Challenges:</h3>
                  <p className="text-textSecondary">{selectedProject.challenges}</p>
                </div>
              )}

              {selectedProject.additionalImages.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-primary mb-4">Additional Images:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedProject.additionalImages.map((imgUrl, idx) => (
                      <div key={idx} className="relative">
                        <img
                          src={imgUrl}
                          alt={`${selectedProject.title} Additional ${idx + 1}`}
                          className="w-full h-auto aspect-video object-cover rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                          onClick={() => openEnlargedImage(imgUrl)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex space-x-4 mt-4">
                {selectedProject.projectUrl && (
                  <a
                    href={selectedProject.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition duration-300 font-medium"
                    aria-label={`View ${selectedProject.title} Project`}
                  >
                    View Project <FaExternalLinkAlt className="ml-2" />
                  </a>
                )}
                {selectedProject.repoUrl && (
                  <a
                    href={selectedProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-secondary text-white py-2 px-4 rounded hover:bg-primary transition duration-300 font-medium"
                    aria-label={`View ${selectedProject.title} Repository`}
                  >
                    View Repo <FaGithub className="ml-2" />
                  </a>
                )}
              </div>
            </div>
          )}
        </Modal>
        {enlargedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            onClick={closeEnlargedImage}
          >
            <img
              src={enlargedImage}
              alt="Enlarged view"
              className="max-w-[90vw] max-h-[90vh] object-contain"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamProjectsSection;