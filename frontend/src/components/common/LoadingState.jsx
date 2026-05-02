const LoadingState = ({ label = "Loading..." }) => (
  <div className="state-card">
    <div className="spinner" />
    <p>{label}</p>
  </div>
);

export default LoadingState;
