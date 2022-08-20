import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CloseIcon from 'react-native-vector-icons/Ionicons';

// utils
import { LginType } from '@Containers/Auth/interfaces';
// components by self
import TopNavigationBar from '@Navigators/topNavigation';
import FacbookIcon from '@Components/iconSvg/FacbookIcon';
import Google from '@Components/iconSvg/Google';
// assets
import styles from './styles';

const LOGIN_KEY = [
  { lable: 'FACBOOK', element: <FacbookIcon /> },
  { lable: 'GOOGLE', element: <Google /> },
  { lable: 'E-Mail', element: <Text style={styles.textEmail}>E-mail</Text> },
];

const LoginContainer = () => {
  const navigation: any = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: (p: any) => (
        <TopNavigationBar
          {...p}
          isLeft={false}
          children={<Text style={styles.titleTab}>Login</Text>}
          right={<CloseIcon name="close" size={32} />}
        />
      ),
    });
  }, [navigation]);

  const handleLogin = (type: LginType) => () => {
    switch (type) {
      case LOGIN_KEY[0].lable:
        break;

      default:
        navigation.navigate('SignUp', { isLogin: true });
        break;
    }
  };
  const _renderItem = ({ item }: any) => (
    <TouchableOpacity style={[styles.buttonContainer, styles.containerContent]} onPress={handleLogin(item.lable)}>
      {item.element}
    </TouchableOpacity>
  );

  return (
    <View style={styles.root}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subTitle}>Sign up with your social login to be faster.</Text>
      </View>
      <FlatList renderItem={_renderItem} data={LOGIN_KEY} keyExtractor={item => item.lable.toString()} />
    </View>
  );
};

export default LoginContainer;
