import Ionicons from '@expo/vector-icons/Ionicons';
import {
  StyleProp,
  StyleSheet,
  ViewStyle,
  View,
  Text,
  TextStyle,
} from 'react-native';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { useColorScheme } from '@/src/hooks/useColorScheme';
import { NAV_THEME } from '../lib/constants';

export interface LessonCardDataProps {
  id: number;
  title: string;
  description: string;
  subtitle?: string;
}

export interface LessonCardProps {
  cardStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  contentTextStyle?: StyleProp<TextStyle>;
  footerStyle?: StyleProp<ViewStyle>;
  data: LessonCardDataProps;
  footer?: string;
}

/**
 * Renders a lesson card with a title, description, and additional content.
 *
 * @param {LessonCardProps} props - The props for the lesson card.
 * @returns {JSX.Element} A JSX element representing the lesson card.
 */
const LessonCard = ({
  cardStyle,
  headerStyle,
  contentStyle,
  data,
  footer,
  contentTextStyle,
}: LessonCardProps) => {
  const { colorScheme } = useColorScheme();
  const themeColors = colorScheme === 'dark' ? NAV_THEME.dark : NAV_THEME.light;

  return (
    <Card
      style={[styles.card, cardStyle, { backgroundColor: themeColors.text }]}
    >
      <CardHeader style={headerStyle}>
        <CardTitle
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: themeColors.background,
          }}
        >
          {data.title}
        </CardTitle>
        {data.subtitle && (
          <CardDescription>
            <Text style={{ color: themeColors.background }}>
              Professora {data.subtitle}
            </Text>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent style={[styles.content, contentStyle]}>
        <Text
          style={[
            { lineHeight: 18, color: themeColors.background },
            contentTextStyle,
          ]}
        >
          {data.description}
        </Text>
      </CardContent>
      {footer && (
        <CardFooter style={{ flexDirection: 'row' }}>
          <View
            style={{
              flex: 0.4,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              borderRadius: 5,
              padding: 5,
              backgroundColor: themeColors.text,
            }}
          >
            <View>
              <Ionicons
                name="barbell-outline"
                size={20}
                color={themeColors.background}
              />
            </View>
            <View>
              <Text
                style={{
                  marginLeft: 5,
                  fontWeight: 'bold',
                  color: themeColors.background,
                }}
              >
                {footer}
              </Text>
            </View>
          </View>
        </CardFooter>
      )}
    </Card>
  );
};

export default LessonCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 15,
    borderRadius: 15,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  content: {
    marginTop: 10,
  },
});
