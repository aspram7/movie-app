import { useEffect, useState, useMemo } from "react";
import Slider from "react-slick";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import data from "data.json";
import "./style.scss";

dayjs.extend(duration);

const settings = {
  infinite: true,
  slidesToShow: 8,
  slidesToScroll: 1,
  arrows: false,
};

type FeatureType = Partial<{
  Id: string;
  Date: string;
  Title: string;
  Duration: string;
  VideoUrl: string;
  Category: string;
  MpaRating: string;
  CoverImage: string;
  TitleImage: string;
  ReleaseYear: string;
  Description: string;
}>;

const Homepage = () => {
  const [showImg, setShowImg] = useState(true);
  const [activeFeature, setActiveFeature] = useState<FeatureType>(data.Featured);
  const [tendingData, setTendingData] = useState<FeatureType[]>(data.TendingNow);

  const duration = useMemo(
    () =>
      dayjs
        .duration(Number(activeFeature.Duration), "seconds")
        .format(Number(activeFeature.Duration) > 3600 ? "H[h] m[m]" : "m[m]"),
    [activeFeature.Duration]
  );

  useEffect(() => {
    const features = sessionStorage.getItem("features");
    if (features) {
      const activeFeatures = JSON.parse(features);
      const activeFeature = data.TendingNow.find((d) => d.Id === activeFeatures[0]) || data.Featured;

      setActiveFeature(activeFeature);

      const restData = data.TendingNow.filter((d) => !activeFeatures.includes(d.Id));
      const filteredData = activeFeatures.map((id: string) => data.TendingNow.find((d) => d.Id === id));

      setTendingData([...filteredData, ...restData]);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (activeFeature.VideoUrl) {
        setShowImg(false);
      }
    }, 2000);
  }, [activeFeature]);

  const handleClick = (item: FeatureType) => {
    setShowImg(true);
    setActiveFeature(item);

    const features = sessionStorage.getItem("features");
    if (!features) {
      sessionStorage.setItem("features", JSON.stringify([item.Id]));
    } else {
      const featuresArr = [item.Id, ...JSON.parse(features)];
      const uniqueFeatures = Array.from(new Set(featuresArr));
      sessionStorage.setItem("features", JSON.stringify(uniqueFeatures));
    }
  };

  return (
    <div className="homepage-container">
      <div className="background">
        {showImg ? (
          <img src={`assets/${activeFeature.CoverImage}`} alt={activeFeature.TitleImage} />
        ) : (
          <video src={activeFeature.VideoUrl} autoPlay loop muted></video>
        )}
      </div>
      <div className="content">
        <h3>{activeFeature.Category}</h3>
        <img src={`assets/${activeFeature.TitleImage}`} alt="title img" />
        <div className="info">
          <span>{activeFeature.ReleaseYear}</span>
          <span>{activeFeature.MpaRating}</span>
          <span>{duration}</span>
        </div>
        <div className="bio">{activeFeature.Description}</div>
        <div className="buttons">
          <button>Play</button>
          <button className="more-info">More Info</button>
        </div>
      </div>
      <div className="slider">
        <p className="title">Trending Now</p>
        <Slider {...settings}>
          {tendingData.map((item) => {
            return (
              <div className="slider-item" key={item.Id}>
                <div>
                  <img src={`assets/${item.CoverImage}`} alt={item.TitleImage} onClick={() => handleClick(item)} />
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default Homepage;
