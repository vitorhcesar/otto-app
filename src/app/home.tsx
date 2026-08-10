import { Redirect } from 'expo-router';

/** Compat: /home → tab Atividades */
export default function HomeRedirect() {
  return <Redirect href="/(tabs)/activities" />;
}
