import * as React from "react";
import { Box } from "./Box";
import { styled } from "../stitches.config";
import { useRouter } from "next/router";
import {
  KBarAnimator,
  KBarProvider,
  KBarPortal,
  useMatches,
  KBarPositioner,
  KBarSearch,
  KBarResults,
} from "kbar";

export default function CommandBar(props) {
  const router = useRouter();

  const actions = [
    {
      id: "home",
      name: "Home",
      shortcut: ["g", "h"],
      keywords: "go-home",
      section: "Go To",
      perform: () => router.push("/"),
      icon: <i className="ri-home-5-line" style={iconStyle} />,
    },
    {
      id: "about",
      name: "About",
      shortcut: ["g", "a"],
      keywords: "go-about",
      section: "Go To",
      perform: () => router.push("/about"),
      icon: <i className="ri-user-line" style={iconStyle} />,
    },
    {
      id: "skills",
      name: "Skills",
      shortcut: ["g", "s"],
      keywords: "go-skills",
      section: "Go To",
      perform: () => router.push("/skills"),
      icon: <i className="ri-article-line" style={iconStyle} />,
    },
    {
      id: "blog",
      name: "Blog",
      shortcut: ["g", "b"],
      keywords: "go-blog",
      section: "Go To",
      perform: () => router.push("/blog"),
      icon: <i className="ri-article-line" style={iconStyle} />,
    },
    {
      id: "projects",
      name: "Projects",
      shortcut: ["g", "p"],
      keywords: "go-projects",
      section: "Go To",
      perform: () => router.push("/projects"),
      icon: <i className="ri-lightbulb-line" style={iconStyle} />,
    },
    {
      id: "copy",
      name: "Copy URL",
      shortcut: ["u"],
      keywords: "copy-url",
      section: "General",
      perform: () => navigator.clipboard.writeText(window.location.href),
      icon: <i className="ri-file-copy-line" style={iconStyle} />,
    },
    {
      id: "email",
      name: "Send Email",
      shortcut: ["e"],
      keywords: "send-email",
      section: "General",
      perform: () => window.open("mailto:abdurashid@outlook.com", "_blank"),
      icon: <i className="ri-mail-line" style={iconStyle} />,
    },
    {
      id: "github",
      name: "Github",
      shortcut: ["f", "g"],
      keywords: "go-github",
      section: "Follow",
      perform: () => window.open("https://github.com/abdurshd", "_blank"),
      icon: <i className="ri-github-line" style={iconStyle} />,
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      shortcut: ["f", "l"],
      keywords: "go-linkedin",
      section: "Follow",
      perform: () =>
        window.open(
          "https://www.linkedin.com/in/abdurshd/",
          "_blank"
        ),
      icon: <i className="ri-linkedin-line" style={iconStyle} />,
    },
  ];

  return (
    <KBarProvider actions={actions}>
      <KBarPortal>
        <Positioner>
          <Animator>
            <Search placeholder="Type a command or search…" />
            <RenderResults />
          </Animator>
        </Positioner>
      </KBarPortal>

      {props.children}
    </KBarProvider>
  );
}

function RenderResults() {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <GroupName>{item}</GroupName>
        ) : (
          <ResultItem action={item} active={active} />
        )
      }
    />
  );
}

const ResultItem = React.forwardRef(({ action, active }, ref) => {
  return (
    <Box ref={ref} css={getResultStyle(active)}>
      <Action>
        {action.icon && action.icon}
        <ActionRow>
          <span>{action.name}</span>
        </ActionRow>
      </Action>
      {action.shortcut?.length ? (
        <Shortcut aria-hidden>
          {action.shortcut.map((shortcut) => (
            <Kbd key={shortcut}>{shortcut}</Kbd>
          ))}
        </Shortcut>
      ) : null}
    </Box>
  );
});

const Kbd = styled("kbd", {
  background: "rgba(255, 255, 255, .1)",
  color: "$secondary",
  padding: "4px 8px",
  textTransform: "uppercase",
});

const Shortcut = styled("div", {
  display: "grid",
  gridAutoFlow: "column",
  gap: "4px",
});

const Action = styled("div", {
  display: "flex",
  gap: "8px",
  alignItems: "center",
});

const ActionRow = styled("div", {
  display: "flex",
  flexDirection: "column",
});
const Positioner = styled(KBarPositioner, {
  position: "fixed",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  width: "100%",
  inset: "0px",
  padding: "14vh 16px 16px",
  background: "rgba(0, 0, 0, .8)",
  boxSizing: "border-box",
});

const Search = styled(KBarSearch, {
  padding: "12px 16px",
  fontSize: "16px",
  width: "100%",
  boxSizing: "border-box",
  outline: "none",
  border: "none",
  margin: 0,
  background: "$command",
  color: "$primary",
});

const Animator = styled(KBarAnimator, {
  backgroundColor: "#1a1c1e",
  maxWidth: "600px",
  width: "100%",
  color: "$primary",
  borderRadius: "8px",
  overflow: "hidden",
  "@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none))": {
    backgroundColor: "$command",
    WebkitBackdropFilter: "saturate(300%) blur(25px)",
    backdropFilter: "saturate(300%) blur(25px)",
  },

  /* Hide scrollbar for Chrome, Safari and Opera */
  "& > div > div::-webkit-scrollbar": {
    display: "none",
  },

  /* Hide scrollbar for IE, Edge and Firefox */
  "& > div > div": {
    "-ms-overflow-style": "none",
    "scrollbar-width": "none",
  },
});

const GroupName = styled("div", {
  padding: "8px 16px",
  fontSize: "10px",
  textTransform: "uppercase",
  letterSpacing: "1px",
  background: "$command",
});

const iconStyle = {
  fontSize: "20px",
  position: "relative",
  top: "-2px",
};

const getResultStyle = active => {
  return {
    padding: '12px 16px',
    background: active ? 'rgba(255, 255, 255, 0.1)' : '$command',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 0,
    cursor: 'pointer',
    color: active ? '$primary' : '$secondary',
  }
}