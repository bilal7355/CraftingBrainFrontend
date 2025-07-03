// Recording_v2.jsx

import React, { useState, useEffect, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import ReactPlayer from "react-player";
import { Helmet } from "react-helmet"; // <-- Add for SEO
import { FaFolderOpen, FaVideo, FaArrowLeft } from "react-icons/fa";

// ====================
//   COSMIC THEME & ANIMATIONS
// ====================

// Cosmic color palette for dark theme
const colors = {
  gradientBg: `radial-gradient(circle at 20% 20%, #0d0033 0%, #14003a 40%, #260057 80%, #00081c 100%)`,
  overlay: "rgba(0, 0, 0, 0.7)",
  cardBg: "rgba(25, 0, 64, 0.6)",
  accent: "#ffdf00",
  textLight: "#ffffff",
  textSecondary: "#cfcfcf",
  error: "#ff4c4c",
  hover: "rgba(255, 255, 255, 0.1)",
};

// Twinkling star animation
const twinkle = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
`;

// Starfield drift animation
const drift = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-2000px); }
`;

// Fade-in
const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const spinAnimation = keyframes`
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
`;

// ====================
//   LAYOUT WRAPPERS
// ====================

const CosmicBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: -100;
  background: ${colors.gradientBg};
`;

const StarsLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2000px;
  background-image: radial-gradient(2px 2px at 50% 50%, #fff, transparent 40%);
  background-repeat: repeat;
  animation: ${drift} 60s linear infinite;
  opacity: 0.5;

  &:nth-child(2) {
    animation-duration: 80s;
    opacity: 0.3;
    transform: translateY(0) scale(1.3);
  }
`;

const PageWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  color: ${colors.textLight};
  font-family: "Poppins", sans-serif;
  overflow-x: hidden;

  &:before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -99;
  }
`;

// Main container for the page content
const MainContent = styled.main`
  padding-bottom: 4rem; /* Ensure some space below if we want a footer later */
`;

const HeroSection = styled.header`
  text-align: center;
  padding: 4rem 1rem 2rem;
  animation: ${fadeIn} 1s ease-in-out;

  h1 {
    font-size: 3rem;
    margin: 0;
    background: -webkit-linear-gradient(#ffffff, ${colors.accent});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 2px;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
    animation: ${twinkle} 2s infinite;
  }

  p {
    margin-top: 1rem;
    color: ${colors.textSecondary};
    font-size: 1rem;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.4;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.2rem;
    }
    p {
      font-size: 0.95rem;
    }
  }
`;

// ====================
//   NAV & BREADCRUMBS
// ====================
const ControlsWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
`;

const BreadcrumbContainer = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 1rem;
`;

const BreadcrumbLink = styled.span`
  cursor: ${(props) => (props.isCurrent ? "default" : "pointer")};
  color: ${(props) => (props.isCurrent ? colors.accent : colors.textLight)};
  text-decoration: ${(props) => (props.isCurrent ? "underline" : "none")};
  transition: color 0.2s;

  &:hover {
    color: ${(props) => (props.isCurrent ? colors.accent : "#ffffff")};
  }
`;

const Divider = styled.span`
  margin: 0 0.4rem;
  color: ${colors.textSecondary};
  font-weight: bold;
`;

const BackButton = styled.button`
  background: transparent;
  border: 1px solid ${colors.accent};
  color: ${colors.accent};
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.3s;

  &:hover {
    background: ${colors.hover};
    box-shadow: 0 0 8px ${colors.accent};
  }

  svg {
    margin-right: 0.3rem;
  }
`;

// ====================
//   GRID & CARDS
// ====================
const CardGrid = styled.section`
  max-width: 1200px;
  margin: 2rem auto 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 1.5rem;
  padding: 0 1rem;
`;

const Card = styled.article`
  background: ${colors.cardBg};
  backdrop-filter: blur(4px);
  border-radius: 12px;
  padding: 1.2rem;
  text-align: center;
  cursor: pointer;
  box-shadow: 0px 0px 15px rgba(255, 255, 255, 0.05);
  animation: ${fadeIn} 0.7s ease-in-out;
  transition: transform 0.4s ease, box-shadow 0.4s ease;

  &:hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow: 0px 0px 25px rgba(255, 255, 255, 0.2);
  }

  h3 {
    margin-top: 0.5rem;
    color: ${colors.accent};
    font-size: 1.1rem;
    margin-bottom: 0.4rem;
    text-shadow: 0 0 6px rgba(255, 255, 255, 0.2);
  }

  p {
    margin: 0;
    font-size: 0.85rem;
    color: ${colors.textSecondary};
  }

  @media (max-width: 480px) {
    padding: 1rem;

    h3 {
      font-size: 1rem;
    }
  }
`;

const CardIcon = styled.div`
  font-size: 2rem;
  color: ${colors.accent};
  animation: ${twinkle} 2s infinite;
`;

// ====================
//   ERROR & LOADER
// ====================
const ErrorText = styled.p`
  text-align: center;
  color: ${colors.error};
  margin-top: 1rem;
  font-weight: bold;
`;

const PopupLoader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${colors.overlay};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2000;

  .spinner {
    width: 70px;
    height: 70px;
    border: 8px solid #ccc;
    border-top: 8px solid ${colors.accent};
    border-radius: 50%;
    animation: ${spinAnimation} 1s linear infinite;
  }

  .loader-text {
    margin-top: 20px;
    font-size: 1.2rem;
    color: #fff;
    text-align: center;
  }
`;

// ====================
//   VIDEO POPUP
// ====================
const VideoPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${colors.overlay};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
  animation: ${fadeIn} 0.5s ease-in-out;
  padding: 1rem;
`;

const PlayerWrapper = styled.div`
  position: relative;
  width: 80%;
  max-width: 1000px;
  aspect-ratio: 16 / 9;

  @media (max-width: 768px) {
    width: 95%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: -45px;
  right: 0;
  background: ${colors.accent};
  color: #000;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s, box-shadow 0.2s;
  z-index: 10;

  &:hover {
    background-color: #ffe26b;
    box-shadow: 0 0 5px #ffd700;
  }

  @media (max-width: 768px) {
    top: -40px;
  }
  @media (max-width: 480px) {
    top: -35px;
    font-size: 0.7rem;
  }
`;

// ====================
//   MAIN COMPONENT
// ====================
function RecordingV2() {
  // ----- STATES -----
  const [batchName, setBatchName] = useState("");
  const [hierarchy, setHierarchy] = useState({});
  const [selectedPath, setSelectedPath] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  // ======= DISABLE INSPECT =======
  function disableInspect() {
    document.addEventListener("contextmenu", (e) => e.preventDefault());
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "C", "J"].includes(e.key)) ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault();
      }
    });
  }

  // ======= UTILITY =======
  function getAuthToken() {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth_token="))
      ?.split("=")[1];
  }

  function getNodeData(pathArray) {
    let node = hierarchy;
    for (let i = 0; i < pathArray.length; i++) {
      if (node && typeof node === "object") {
        node = node[pathArray[i]];
      } else {
        return null;
      }
    }
    return node;
  }

  // ======= FETCH HIERARCHY =======
  const fetchRecordings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const authToken = getAuthToken();
      if (!authToken) throw new Error("Authentication token not found.");

      const response = await fetch(
        "https://qlw95zx5ta.execute-api.eu-north-1.amazonaws.com/t/user/fetchhierarchy/hierarchy",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({}),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch hierarchy. Code: ${response.status}`);
      }

      const data = await response.json();
      setBatchName(data.BatchName || "Untitled Batch");
      setHierarchy(data.Hierarchy || {});
      setSelectedPath([]);
    } catch (err) {
      setError(err.message || "Error fetching recordings.");
    } finally {
      setLoading(false);
    }
  }, []);

  // ======= FETCH VIDEO =======
  const fetchVideoUrl = useCallback(
    async (fullPathArray) => {
      try {
        setLoading(true);
        setError(null);

        const authToken = getAuthToken();
        if (!authToken) {
          throw new Error("Authentication token not found. Please log in again.");
        }

        // Remove ".mp4" or "files" from end of path
        const trimmedPath = fullPathArray.filter(
          (item) => !item.includes(".mp4") && item !== "files"
        );

        const completePath = [batchName, ...trimmedPath];

        const response = await fetch(
          "https://qlw95zx5ta.execute-api.eu-north-1.amazonaws.com/t/user/fetchvideo/getvideo",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({ hierarchy_path: completePath }),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch video. Code: ${response.status}`);
        }

        const videoUrls = await response.json();
        if (videoUrls && videoUrls.length > 0) {
          setVideoUrl(videoUrls[0]);
        } else {
          throw new Error("No video URLs found.");
        }
      } catch (err) {
        setError(err.message || "Error fetching video.");
      } finally {
        setLoading(false);
      }
    },
    [batchName]
  );

  // ======= NAV HANDLERS =======
  const handleNodeClick = (name) => {
    const newPath = [...selectedPath, name];
    const nodeData = getNodeData(newPath);

    if (Array.isArray(nodeData)) {
      // If multiple files, fetch the first automatically:
      if (nodeData.length > 0) {
        fetchVideoUrl([...newPath, nodeData[0]]);
      }
      return;
    }
    if (nodeData && typeof nodeData === "object") {
      setSelectedPath(newPath);
    }
  };

  const handleBack = () => {
    if (selectedPath.length === 0) return;
    const newPath = [...selectedPath];
    newPath.pop();
    setSelectedPath(newPath);
  };

  // ======= EFFECTS =======
  useEffect(() => {
    disableInspect();
    fetchRecordings();
  }, [fetchRecordings]);

  // ======= RENDER LOGIC =======
  const currentNode = getNodeData(selectedPath);

  // Build cards if current node is an object
  let cards = [];
  if (
    currentNode &&
    typeof currentNode === "object" &&
    !Array.isArray(currentNode)
  ) {
    cards = Object.keys(currentNode).map((key) => {
      const isVideoArray = Array.isArray(currentNode[key]);
      return (
        <Card key={key} onClick={() => handleNodeClick(key)}>
          <CardIcon aria-label={isVideoArray ? "Video icon" : "Folder icon"}>
            {isVideoArray ? <FaVideo /> : <FaFolderOpen />}
          </CardIcon>
          <h3>{key}</h3>
          <p>{isVideoArray ? "Video file(s)" : "Folder"}</p>
        </Card>
      );
    });
  }

  // Build breadcrumb
  const breadcrumb = selectedPath.map((part, idx) => {
    const isCurrent = idx === selectedPath.length - 1;
    const jumpPath = selectedPath.slice(0, idx + 1);

    return (
      <React.Fragment key={idx}>
        <BreadcrumbLink
          isCurrent={isCurrent}
          onClick={() => {
            if (!isCurrent) setSelectedPath(jumpPath);
          }}
        >
          {part}
        </BreadcrumbLink>
        {idx < selectedPath.length - 1 && <Divider>/</Divider>}
      </React.Fragment>
    );
  });

  return (
    <>
      {/* Helmet for SEO */}
      <Helmet>
        <title>{batchName ? `Recordings - ${batchName}` : "Recordings"}</title>
        <meta
          name="description"
          content="Explore and watch recordings organized by your batch's hierarchy."
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      {/* COSMIC BG & STARFIELD */}
      <CosmicBackground>
        <StarsLayer />
        <StarsLayer />
      </CosmicBackground>

      <PageWrapper>
        {/** Main content wrapper */}
        <MainContent>
          {/* LOADER */}
          {loading && (
            <PopupLoader>
              <div className="spinner"></div>
              <div className="loader-text">Loading cosmic data...</div>
            </PopupLoader>
          )}

          {/* HERO SECTION */}
          <HeroSection>
            <h1>{batchName || "Your Batch Recordings"}</h1>
            <p>Embark on a cosmic journey through your recordings and folders.</p>
          </HeroSection>

          {/* ERROR */}
          {error && <ErrorText>{error}</ErrorText>}

          {/* BREADCRUMB + BACK BUTTON */}
          <ControlsWrapper>
            {selectedPath.length > 0 && (
              <BackButton onClick={handleBack} aria-label="Go back">
                <FaArrowLeft /> Back
              </BackButton>
            )}
            <BreadcrumbContainer aria-label="Breadcrumb">
              {selectedPath.length === 0 ? (
                <BreadcrumbLink isCurrent>
                  {batchName || "Root"}
                </BreadcrumbLink>
              ) : (
                <>
                  <BreadcrumbLink onClick={() => setSelectedPath([])}>
                    {batchName || "Root"}
                  </BreadcrumbLink>
                  <Divider>/</Divider>
                  {breadcrumb}
                </>
              )}
            </BreadcrumbContainer>
          </ControlsWrapper>

          {/* FOLDER/VIDEO LISTING */}
          {(!currentNode ||
            (typeof currentNode === "object" &&
              Object.keys(currentNode).length === 0)) && (
            <p style={{ textAlign: "center", color: colors.textSecondary }}>
              {loading ? "" : "No items found at this level."}
            </p>
          )}

          {currentNode &&
            typeof currentNode === "object" &&
            !Array.isArray(currentNode) && (
              <CardGrid>{cards}</CardGrid>
            )}

          {/* VIDEO POPUP */}
          {videoUrl && (
            <VideoPopup>
              <PlayerWrapper>
                <CloseButton onClick={() => setVideoUrl(null)}>
                  Close
                </CloseButton>
                <ReactPlayer
                  url={videoUrl}
                  controls
                  playing
                  width="100%"
                  height="100%"
                  config={{
                    file: { attributes: { controlsList: "nodownload" } },
                  }}
                />
              </PlayerWrapper>
            </VideoPopup>
          )}
        </MainContent>
      </PageWrapper>
    </>
  );
}

export default RecordingV2;
