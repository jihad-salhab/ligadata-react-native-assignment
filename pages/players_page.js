import React from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Dimensions, StyleSheet, Text, View, FlatList, StatusBar, TouchableOpacity, Alert } from 'react-native'
const API_URL = 'https://www.balldontlie.io/api/v1/players'
const COLOR = '#303030'
const screenWidth = Dimensions.get('window').width,
  screenheight = Dimensions.get('window').height;
class PlayerPage extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      playersList: [],
      pramm: this.props.route.params.msg,
    };
  }

  componentDidMount() {
    this.apiCall();
  }

  async apiCall() {
    let response = await fetch(API_URL);
    let json = await response.json();
    this.setState({
      //Filterign the data according to the passed team id from the previous screen
      playersList: json.data.filter((a) => {
        return a.team.id === this.state.pramm;
      })
    });
  }


  render() {
    return (
      <View style={styles.container}>
        <FlatList
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          data={this.state.playersList}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            let isOpened = false;
            return (
              <View style={styles.item}>
                <View style={styles.tileIdContainer}>
                  <Text style={{ color: 'white', textAlign: 'center' }}>Player ID</Text>
                  <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>{item.id}</Text>
                </View>
                <View style={{ padding: '2%', width: '80%' }}>
                  <Text style={{ fontWeight: 'bold' }}>{item.first_name + ' ' + item.last_name}</Text>
                  <Text>{'Position: ' + (item.position == '' ? 'Not Available' : item.position)}</Text>
                  <Text>{'Height in Feet: ' + (item.height_feet == null ? 'Not Available' : item.height_feet)}</Text>
                  <Text>{'Height in Inches: ' + (item.height_inches == null ? 'Not Available' : item.height_inches)}</Text>
                  <Text>{'Weight in Pounds: ' + (item.weight_pounds == null ? 'Not Available' : item.weight_pounds)}</Text>
                  <View style={{ alignContent: 'center' }}>
                    <TouchableOpacity onPress={() => {
                      Alert.alert(
                        'Player Info',
                        "Id : " + item.id + '\n' +
                        "First name:    " + item.first_name + '\n' +
                        "Height in Feet: " + item.height_feet + '\n' +
                        "Height in Inches: " + (item.height_inches == null ? "not avalible" : item.height_feet) + '\n' +
                        "Last name:  " + item.last_name + '\n' +
                        "Position: " + item.position + '\n' +
                        "Weight in Pounds: " + (item.weight_pounds == null ? "not avalible" : item.weight_pounds) + '\n',
                        [
                          { text: 'Dismiss' }
                        ]
                      );

                    }}
                    >
                      <View style={styles.button}>
                        <Text style={styles.text}>{item.first_name}!</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

              </View>
            )
          }
          }
        />

      </View >
    )
  }
}

export default PlayerPage

const styles = StyleSheet.create({
  tileIdContainer: {
    backgroundColor: COLOR,
    paddingTop: '13%',
    width: '20%',
    borderRadius: 9,
  }
  ,
  statusBar: {
    backgroundColor: COLOR
  },
  header: {
    marginTop: StatusBar.currentHeight,
    marginBottom: 10,
    backgroundColor: COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: screenheight * 0.07,
  },
  headerText: {
    color: '#FFF'
  },
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#CED0CE'
  },
  item: {
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    width: 110,
    marginTop: 10,
    marginLeft: 60,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: "black",
  },
  text: {
    textAlign: "center",
    color: '#fff',
    fontSize: 15
  }
})
