import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { RootStackParamList } from '@Navigators/appNavigator';
import { HEIGHT } from '@Constants/app';
import { colors, fontFamily } from '@Theme/index';

type MessageScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MessageAlert'>;
type MessageScreenRouteProp = RouteProp<RootStackParamList, 'MessageAlert'>;

const MessageAlert = () => {
  const navigation = useNavigation<MessageScreenNavigationProp>();
  const route = useRoute<MessageScreenRouteProp>();
  const [visible, setVisible] = useState<boolean>(false);
  const handleSub = () => {
    !!route.params?.callBack ? route.params?.callBack() : navigation.goBack();
    setVisible(false);
  };
  useEffect(() => {
    setVisible(!!route.params?.visible ? route.params?.visible : false);
  }, [route]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={[styles.txt, styles.txtTitle]}>{route.params?.title}</Text>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity style={[styles.btn]} onPress={handleSub}>
              <Text style={[styles.txt]}>{route.params?.txtOK || 'OK'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MessageAlert;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginHorizontal: 40,
    borderRadius: 16,
    shadowColor: colors.green,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 4,
  },
  modalContainer: {
    flex: 1,
    height: HEIGHT,
    display: 'flex',
    backgroundColor: 'rgba(210, 215, 211, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderBottomColor: colors.gray04,
    borderBottomWidth: 1,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
  },
  btn: {
    flex: 1,
    paddingVertical: 10,
  },
  txt: {
    fontFamily: fontFamily.Strawford,
    fontSize: 16,
    textAlign: 'center',
  },
  txtTitle: {
    color: colors.black2,
  },
  txtCancle: {
    color: colors.green2,
  },
  txtDelete: {
    color: colors.red,
  },
});
