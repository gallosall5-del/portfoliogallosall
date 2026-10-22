import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import Modal from 'react-bootstrap/Modal';

function ProjectMedia({ project }) {
  if (!project?.image) return null;
  return (
    <div
      className="project-card__media"
      style={project.imageBackground ? { background: project.imageBackground } : undefined}
    >
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        style={project.imageFit ? { objectFit: project.imageFit } : undefined}
      />
    </div>
  );
}

ProjectMedia.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    imageFit: PropTypes.string,
    imageBackground: PropTypes.string,
  }).isRequired,
};

function Tags({ tags }) {
  if (!tags?.length) return null;
  return (
    <div className="project-card__tags">
      {tags.map((tag) => (
        <span key={tag} className="project-tag">{tag}</span>
      ))}
    </div>
  );
}

Tags.propTypes = { tags: PropTypes.arrayOf(PropTypes.string) };
Tags.defaultProps = { tags: [] };

function Links({ links }) {
  if (!links?.length) return null;
  return (
    <div className="project-card__links">
      {links.map((link) => (
        <a key={link.href} className="proj-link" href={link.href} target="_blank" rel="noopener noreferrer">
          {`${link.text} ↗`}
        </a>
      ))}
    </div>
  );
}

Links.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  })),
};
Links.defaultProps = { links: [] };

const ProjectCard = ({ project, featured = false }) => {
  const [open, setOpen] = useState(false);

  return (
    <article
      className={`tile tile--interactive project-card ${
        featured ? 'span-4 project-card--featured' : 'span-2'
      }`}
    >
      <ProjectMedia project={project} />

      <div className="project-card__body">
        {project.status && <span className="project-status">{project.status}</span>}
        <h3 className="project-card__title">{project.title}</h3>
        <div className="project-card__text">
          <ReactMarkdown>{project.bodyText}</ReactMarkdown>
        </div>
      </div>

      <div className="project-card__footer">
        <div className="project-card__links">
          <button type="button" className="proj-link" onClick={() => setOpen(true)}>
            Voir les détails →
          </button>
        </div>
        <Links links={project.links} />
        <Tags tags={project.tags} />
      </div>

      <Modal show={open} onHide={() => setOpen(false)} centered size="lg" contentClassName="project-modal">
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>{project.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProjectMedia project={project} />
          {project.status && <span className="project-status">{project.status}</span>}
          {project.role && (
            <p className="project-modal__role">
              <strong>Mon rôle : </strong>
              {project.role}
            </p>
          )}
          <ReactMarkdown>{project.bodyText}</ReactMarkdown>
          <Links links={project.links} />
          <Tags tags={project.tags} />
        </Modal.Body>
      </Modal>
    </article>
  );
};

ProjectCard.propTypes = {
  featured: PropTypes.bool,
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    image: PropTypes.string,
    imageFit: PropTypes.string,
    imageBackground: PropTypes.string,
    status: PropTypes.string,
    role: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })),
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProjectCard;
