import AboutComp from "../../components/AboutComp";
import LandingPageHeader from "../../components/LandingPageHeader";
const About = () => {
  return (
    <div className="flex flex-col items-center bg-policies-bg bg-cover bg-no-repeat min-h-screen w-screen h-screen">

      <div 
      className="w-full"
      >
        <LandingPageHeader/>
      </div>

        <AboutComp/>
        
    </div>
  );
};

export default About;
