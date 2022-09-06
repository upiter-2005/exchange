import ContentLoader from "react-content-loader";

const Loader = (props) => (
  <ContentLoader
    speed={2}
    width={309}
    height={26}
    viewBox="0 0 309 26"
    backgroundColor="#35b5be"
    foregroundColor="#333"
    style={{ width: "100%", opacity: 0.6 }}
    {...props}
  >
    <rect x="4" y="4" rx="3" ry="3" width="301" height="18" />
  </ContentLoader>
);

export default Loader;
