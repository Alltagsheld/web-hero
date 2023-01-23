import { QuestSelection } from "src/components/QuestSelection/QuestSelection";
import { Layout } from "src/layouts/Layout";
import { useAuth } from "../../hooks/useAuth";

export const HeroBase: React.FC = () => {
  const auth = useAuth();
  return (
    <Layout
      mainContent={<QuestSelection />}
      showSkills
      customTitle={auth?.user?.name}
      customSubTitle="- Ark Board -"
    />
  );
};
