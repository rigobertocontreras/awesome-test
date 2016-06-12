/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 'use strict';

 import React, { Component } from 'react';
 import {
   AlertIOS,
   AppRegistry,
   ListView,
   Modal,
   StyleSheet,
   Text,
   TextInput,
   TouchableHighlight,
   View
} from 'react-native';

const Firebase = require('firebase');
const StatusBar = require('./components/StatusBar');
const ActionButton = require('./components/ActionButton');
const ListItem = require('./components/ListItem');
const styles = require('./styles.js');
const FirebaseUrl = 'https://test-122a0.firebaseio.com/';

class AwesomeProject extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        modalVisible: false
      };
      this.itemsRef = this.getRef().child('post');
    }
    getRef() {
      return new Firebase(FirebaseUrl);
    }
    listenForItems(itemsRef) {
      itemsRef.on('value', (snap) => {

        // get children as an array
        var items = [];
        snap.forEach((child) => {
          items.push({
            title: child.val().comment,
            _key: child.key()
          });
        });

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(items),
          modalVisible: false,
        });

      });
    }
    componentDidMount() {
      this.listenForItems(this.itemsRef);
    }
    render() {
      var modalBackgroundStyle = {
        backgroundColor: 'rgba(0, 0, 0, 0.5)' ,
      };
      var innerContainerTransparentStyle = { backgroundColor: '#fff', padding: 20 };

      return (
        <View style={styles.container}>
          <StatusBar title="Post Lista" />
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderItem.bind(this)}
            style={styles.listview}/>
          <ActionButton onPress={this._addItem.bind(this)} title="Add" />
          <Modal
            animationType="none"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {this._setModalVisible(false)}}
            >
            <View style={[styles.container, modalBackgroundStyle]}>
              <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
                <Text>Write your comment</Text>
                <TextInput
                  style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    />
              </View>
              <ActionButton onPress={this._onSubmit.bind(this)} title="Save" />
              <ActionButton onPress={this._setModalVisible.bind(this, false)} title="Cancel" />
            </View>
          </Modal>
      </View>
      )
    }
    _setModalVisible(visible) {
      this.setState({text: null, modalVisible: visible});
    }
    _onSubmit(){
      this.itemsRef.push({ comment: this.state.text });
      this._setModalVisible(false);
    }
    _addItem() {
      this._setModalVisible(true);
    }
    _renderItem(item) {
      const onPress = () => {
        AlertIOS.alert(
          'Complete',
          null,
          [
            {text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove()},
            {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
          ],
          'default'
        );
      };

      return (
        <ListItem item={item} onPress={onPress} />
      );
    }

  }

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
