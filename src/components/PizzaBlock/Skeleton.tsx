import ContentLoader from 'react-content-loader';

const PizzaLoader = () => (
  <div className="pizza-block">
    <ContentLoader
      className="skeleton"
      speed={2}
      width={270}
      height={465}
      viewBox="0 0 280 465"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="140" cy="130" r="130" />
      <rect x="0" y="270" rx="8" ry="8" width="280" height="25" />
      <rect x="0" y="322" rx="8" ry="8" width="280" height="86" />
      <rect x="1" y="430" rx="8" ry="8" width="90" height="30" />
      <rect x="124" y="423" rx="8" ry="8" width="152" height="40" />
    </ContentLoader>
  </div>
);

export default PizzaLoader;
