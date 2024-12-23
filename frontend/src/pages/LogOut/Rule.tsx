import LandingPageHeader from "../../components/LandingPageHeader";
import RulesComponents from "../../components/ruleComp";
const Rule = () => {
  return (
    <div className="flex flex-col items-center bg-policies-bg bg-cover bg-no-repeat sm:bg-top md:bg-right lg:bg-left w-screen h-screen">
      <div className="w-full">
        <LandingPageHeader />
      </div>

      <RulesComponents />
    </div>
  );
};

export default Rule;
