import {
  ImageBackground,
  StyleSheet,
  View,
  StatusBar,
  ActivityIndicator,
  Pressable,
  Alert,
  GestureResponderEvent,
} from 'react-native';
import LoginBackground from '../../assets/images/bg-login.png';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Input, Text, CheckBox, Button} from '@ui-kitten/components';
import {useState} from 'react';
import LogoIcon from '../../assets/icons/logo-ico.svg';
import UserEmailIcon from '../../assets/icons/user-email-ico.svg';
import PasswordIcon from '../../assets/icons/password-ico.svg';
import EyeIcon from '../../assets/icons/eye-ico.svg';
import {Typography, Colors} from '../../styles';
import {login} from '../../services/api';
import {setAccessToken} from '../../store/user';
import {useTranslation} from 'react-i18next';
import {
  saveEmail,
  savePassword,
  selectEmail,
  selectIsSavePassword,
  selectPassword,
  setIsSavePassword,
  useAppStore,
} from '../../store/app';
import {useFormik} from 'formik';
import * as yup from 'yup';

export function Login() {
  const isSavePassword = useAppStore(selectIsSavePassword);
  const emailSaved = useAppStore(selectEmail);
  const passwordSaved = useAppStore(selectPassword);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {t} = useTranslation();
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email(t('enter-valid-email'))
      .required(t('email-required')),
    password: yup
      .string()
      .min(6, ({min}) => t('password-at-least', {min}))
      .required(t('password-required')),
  });

  const formik = useFormik({
    initialValues: {
      email: emailSaved,
      password: passwordSaved,
    },
    validationSchema: loginValidationSchema,
    onSubmit: values => {
      handleSignIn(values.email, values.password);
    },
  });

  const handleSignIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      //email: tokenize.test@gmail.com
      //password: Test#111
      const data = await login(email, password);
      if (data) {
        setAccessToken(data.accessToken);
        if (isSavePassword) {
          saveEmail(email);
          savePassword(password);
        }
      }
    } catch (error) {
      Alert.alert(t('error'), t('something-wrong'));
    } finally {
      setIsLoading(false);
    }
  };

  const renderPasswordAccessoryRight = (): React.ReactElement => {
    return (
      <Pressable onPress={() => setSecureTextEntry(prevState => !prevState)}>
        <EyeIcon />
      </Pressable>
    );
  };

  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <ImageBackground source={LoginBackground} style={styles.container}>
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.content}>
            <LogoIcon />
            <Text
              style={StyleSheet.flatten([styles.title, styles.commonText])}
              category="h2">
              {t('sign-in')}
            </Text>
            <Text
              style={StyleSheet.flatten([styles.subTitle, styles.commonText])}
              category="p1">
              {t('please-sign-in-to-continue')}
            </Text>
            <Input
              id="email"
              placeholder={t('email')}
              placeholderTextColor={Colors.neutral.gray04}
              value={formik.values.email}
              onChangeText={formik.handleChange('email')}
              style={StyleSheet.flatten([styles.input, {marginBottom: 10}])}
              textStyle={StyleSheet.flatten([
                styles.inputText,
                styles.commonText,
              ])}
              accessoryLeft={<UserEmailIcon />}
              size="large"
            />
            {formik.errors.email && (
              <Text style={styles.errorText} status="danger" category="c2">
                {formik.errors.email}
              </Text>
            )}
            <Input
              id="password"
              placeholder={t('password')}
              placeholderTextColor={Colors.neutral.gray04}
              value={formik.values.password}
              onChangeText={formik.handleChange('password')}
              secureTextEntry={secureTextEntry}
              style={StyleSheet.flatten([styles.input, {marginBottom: 16}])}
              textStyle={StyleSheet.flatten([
                styles.inputText,
                styles.commonText,
              ])}
              accessoryLeft={<PasswordIcon />}
              accessoryRight={renderPasswordAccessoryRight}
              size="large"
            />
            {formik.errors.password && (
              <Text style={styles.errorText} status="danger" category="c2">
                {formik.errors.password}
              </Text>
            )}
            <View style={styles.belowInputView}>
              <CheckBox checked={isSavePassword} onChange={setIsSavePassword}>
                {evaProps => (
                  <Text
                    {...evaProps}
                    style={StyleSheet.flatten([
                      evaProps?.style,
                      {color: Colors.neutral.white},
                    ])}>
                    {t('remember-me')}
                  </Text>
                )}
              </CheckBox>
              <Text style={styles.commonText} category="s2">
                {t('forgot-password')}
              </Text>
            </View>
            <Button
              style={styles.signInButton}
              size="large"
              onPress={
                formik.handleSubmit as unknown as (
                  e: GestureResponderEvent,
                ) => void
              }>
              {evaProps =>
                isLoading ? (
                  <ActivityIndicator />
                ) : (
                  <Text
                    {...evaProps}
                    category="h4"
                    style={StyleSheet.flatten([
                      evaProps?.style,
                      styles.signInButtonText,
                    ])}>
                    {t('sign-in')}
                  </Text>
                )
              }
            </Button>
            <Text category="p2" style={styles.commonText}>
              {t('dont-have-account')}
              <Text
                category="s2"
                style={StyleSheet.flatten([
                  styles.commonText,
                  {textTransform: 'uppercase'},
                ])}>
                {t('sign-up')}
              </Text>
            </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  inputText: {
    ...Typography.body.x30,
  },
  title: {
    marginTop: 24,
    marginBottom: 9,
  },
  subTitle: {
    marginBottom: 60,
  },
  belowInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 90,
  },
  signInButton: {
    width: '100%',
    backgroundColor: '#BDCFFF',
    marginBottom: 40,
    borderWidth: 0,
  },
  signInButtonText: {
    color: Colors.primary.brand02,
    ...Typography.monospace.base,
    textTransform: 'uppercase',
  },
  commonText: {
    ...Typography.monospace.base,
    color: Colors.neutral.white,
  },
  errorText: {
    ...Typography.monospace.base,
    marginBottom: 10,
    textAlign: 'left',
    width: '100%',
  },
});
