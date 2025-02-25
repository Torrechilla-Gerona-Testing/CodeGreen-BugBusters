import Header from "../components/Header";
import AboutComp from "../components/AboutComp";
const AboutPage = () => {
  return (
    <div className="flex flex-col items-center bg-policies-bg bg-cover bg-no-repeat min-h-screen w-screen h-screen">

      <div 
      className="w-full"
      >
        <Header />
      </div>

        <AboutComp/>

    </div>
  );
};

export default AboutPage;
