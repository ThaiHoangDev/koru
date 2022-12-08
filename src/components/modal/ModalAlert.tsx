import { StyleSheet, Text, View, Modal, ModalProps, TouchableOpacity } from 'react-native';
import React from 'react';
import { HEIGHT } from '@Constants/app';
import { colors, fontFamily } from '@Theme/index';

interface IProps extends ModalProps {
  visible: boolean;
  onCancle: () => void;
  onSub: () => void;
}

const ModalAlert = (props: IProps) => {
  const { visible, onCancle, onSub, ...rest } = props;

  const handleCancle = () => {
    console.log('hahahah')
    onCancle();
  };
  const handleSub = () => {
    onSub();
  };

  return (
    <Modal {...rest} visible={visible} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={[styles.txt, styles.txtTitle]}> Delete this plant?</Text>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.btn, { borderRightWidth: 1, borderRightColor: colors.gray04 }]}
              onPress={handleCancle}>
              <Text style={[styles.txt, styles.txtCancle]}> Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn]} onPress={handleSub}>
              <Text style={[styles.txt, styles.txtDelete]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalAlert;

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
