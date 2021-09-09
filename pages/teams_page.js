import React from 'react'
import { Dimensions, StyleSheet, Text, View, FlatList, StatusBar, Image, Touchable, TouchableOpacity } from 'react-native'
const API_URL = 'https://balldontlie.io/api/v1/teams'
const COLOR = '#303030'
const screenWidth = Dimensions.get('window').width,
  screenheight = Dimensions.get('window').height;
class TeamPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playersList: []
    };
  }

  componentDidMount() {
    this.apiCall();
  }

  async apiCall() {
    let response = await fetch(API_URL);
    let json = await response.json();
    this.setState({ playersList: json.data });
  }

  render() {

    return (
      <View style={styles.container}>


        <FlatList
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          data={this.state.playersList}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={styles.tileIdContainer}>
                <Text style={{ color: 'white', textAlign: 'center' }}>Team ID</Text>
                <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>{item.id}</Text>
              </View>
              <View style={{ paddingLeft: '2%', width: '60%' }}>
                <Text style={{ fontWeight: 'bold' }}>{item.abbreviation + ': ' + item.full_name}</Text>
                <Text>{'Name: ' + item.name}</Text>
                <Text>{'City: ' + item.city}</Text>
                <Text>{'Conference: ' + item.conference}</Text>
                <Text>{'Division: ' + item.division}</Text>
              </View>
              <View style={{ alignItems: 'center', paddingLeft: '2%', width: '20%' }}>
                <TouchableOpacity
                  style={{ alignItems: 'center' }}
                  onPress={
                    //Navigating To Players Screen Of A Certain Team
                    //PASSING TEAM ID TO NEXT PAGE 
                    ()=>this.props.navigation.navigate('Players Page',{msg:item.id})
                  }
                >
                  <Image style={styles.trailingImageSize} source={require('../images/details.png')} />
                  <Text style={{ textAlign: 'center' }}>Team Players</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    )
  }
}

export default TeamPage

const styles = StyleSheet.create({
  tileIdContainer: {
    backgroundColor: COLOR,
    paddingTop: '7%',
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
  },
  separator: {
    height: 1,
    backgroundColor: '#CED0CE'
  },
  item: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  trailingImageSize:
  {
    width: screenWidth * .08,
    height: screenWidth * .08,
    alignItems: "center",
    marginTop: (screenWidth * .05),
  }

})
