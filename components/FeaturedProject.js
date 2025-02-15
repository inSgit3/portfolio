import { styled } from "../stitches.config";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from 'next/link';

const FeaturedProjectIcon = styled("div", {
  fontSize: "24px",
  padding: "0 10px 0 0",
});

export default function FeaturedProject(props) {
  const { project } = props;
  
  // If project has an id, it means it has a details page
  const ProjectWrapper = project.id ? Link : 'a';
  const projectProps = project.id 
    ? { href: `/projects/${project.id}` }
    : { href: project.url, target: "_blank" };

  return (
    <ProjectWrapper {...projectProps}>
      <Project>
        <Animation index={props.index}>
          <FeaturedProjectIcon>
            <i className={`ri-${project.icon}-line`} />
          </FeaturedProjectIcon>
          <Body>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: props.index * 0.1 }}
            >
              <Title>{project.title}</Title>
              <Description>{project.description}</Description>
              <Stats>{project.stats}</Stats>
            </motion.div>
          </Body>
        </Animation>
      </Project>
    </ProjectWrapper>
  );
}

function Animation(props) {
  const [hovered, setHovered] = useState("");
  const isHovered = hovered === props.index;

  return (
    <AnimContainer
      onHoverStart={() => setHovered(props.index)}
      onHoverEnd={() => setHovered("")}
      className="featured-project-anim"
    >
      {isHovered && (
        <AnimHovered
          layoutId="featuredProjects"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      {props.children}
    </AnimContainer>
  );
}

const Project = styled("a", {
  display: "flex",
  transition: "opacity $duration ease-in-out",
  border: "0",
  borderRadius: "$borderRadius",
  textDecoration: "none",
  width: "auto",
  "&:hover": { opacity: 1 },
  "@bp2": { width: 180 },
});

const Body = styled("div", {
  flex: "1 1 auto",
});

const Title = styled("p", {
  color: "$primary",
  margin: "0",
  fontSize: "18px",
});

const Description = styled("p", {
  margin: "0",
  color: "$secondary",
  lineHeight: "24px",
});

const Stats = styled("p", {
  margin: "5px 0 0",
  color: "$primary",
  textTransform: "uppercase",
  display: "inline-block",
  fontWeight: 500,
  letterSpacing: "1.2px",
  fontSize: "12px",
});

const AnimContainer = styled(motion.span, {
  position: "relative",
  width: "100%",
  padding: "20px",
});

const AnimHovered = styled(motion.span, {
  position: "absolute",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  background: "$hover",
  borderRadius: "$borderRadius",
  zIndex: -1,
});