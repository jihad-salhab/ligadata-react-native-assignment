import React from 'react'
import { Dimensions, StyleSheet, Text, View, FlatList, StatusBar, Image, Touchable, TouchableOpacity } from 'react-native'
import IconBadge from 'react-native-icon-badge';
import { SearchBar } from 'react-native-elements';
//Defining base url of Games
const API_URL = 'https://balldontlie.io/api/v1/games'
const COLOR = '#303030'
const screenWidth = Dimensions.get('window').width,
  screenheight = Dimensions.get('window').height;
class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //State Variables
      playersList: [],
      searchText: "",
      filteredData: []
    };
  }
  //Calling the method wich triggers the API method to retrieve data to show on page 
  componentDidMount() {
    this.apiCall();
  }

  //The responsible function for calling and parsing the data from the API's URL
  async apiCall() {
    let response = await fetch(API_URL);
    let json = await response.json();
    //Updating the state of the application
    this.setState({ playersList: json.data.sort((a, b) => new Date(b.date) - new Date(a.date)) });
  }
  search = (searchText) => {
    //Updating the state of the application
    this.setState({ searchText: searchText });

    //Filtering the data according to the entered text in the search field
    let filteredData = this.state.playersList.filter(function (item) {
      return (item.id + '').indexOf(parseInt(searchText)) > -1

    });

    //Updating the filtered data list to show on the screen
    this.setState({ filteredData: filteredData });
  };

  render() {
    return (
      <View style={styles.container}>
        {/* Rendering The Search Bar At the Top Of the Page */}
        <SearchBar
          keyboardType='number-pad'
          round={true}
          lightTheme={true}
          placeholder="Search... e.g.48760"
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={this.search}
          value={this.state.searchText}
        />
        {/* Rendering The FlatList since flatlist only loads the visible data and prepares the rest */}
        <FlatList
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          data={this.state.filteredData && this.state.filteredData.length > 0 ? this.state.filteredData : this.state.playersList}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            let homeTeam = item.home_team;
            let visitorTeam = item.visitor_team;
            return (
              //Showing an icon badge that indicates the {item.status}
              <IconBadge
                MainElement={
                  <View>
                    <View style={{ paddingLeft: screenWidth * .2, width: '100%', alignItems: 'center' }}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLOR }}>
                        {item.date.substring(0, 10)}
                      </Text>
                    </View>
                    <View style={styles.item}>
                      <View style={styles.tileIdContainer}>
                        <Text style={{ color: 'white', textAlign: 'center' }}>Game ID</Text>
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>{item.id}</Text>
                      </View>
                      {/* Left Panel Of Home Team */}
                      <View style={{ paddingLeft: '1%', width: '35%', alignItems: 'center' }}>
                        <Text style={{
                          fontWeight: 'bold',
                          // Coloring the winner team in green otherwise red
                          color: parseInt(item.home_team_score) >
                            parseInt(item.visitor_team_score) ? 'green' : 'red'
                        }}>
                          {homeTeam.abbreviation}
                        </Text>
                        <Text style={{ fontWeight: 'bold', paddingBottom: 10 }}>
                          {item.home_team_score}
                        </Text>
                        <Text>{homeTeam.name}</Text>
                      </View>
                      {/* Middle Panel Of Home Team */}
                      <View style={{ width: '10%', alignSelf: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLOR }}>
                          VS
                        </Text>
                      </View>
                      {/* Right Panel Of Home Team */}
                      <View style={{ width: '35%', alignItems: 'center' }}>
                        <Text style={{
                          fontWeight: 'bold',
                          // Coloring the winner team in green otherwise red
                          color: parseInt(item.home_team_score) >
                            parseInt(item.visitor_team_score) ? 'red' : 'green'
                        }}>
                          {visitorTeam.abbreviation}
                        </Text>
                        <Text style={{ fontWeight: 'bold', paddingBottom: 10 }}>{item.visitor_team_score}</Text>
                        <Text>{visitorTeam.name}</Text>

                      </View>
                    </View>
                  </View>
                }
                //The Icon Badge Element Value
                BadgeElement={
                  <Text style={{ color: '#FFFFFF' }}>{item.status}</Text>
                }
                IconBadgeStyle={
                  {
                    width: 50,
                    height: 25,
                    backgroundColor: '#303030',
                    marginTop: 5
                  }
                }
              />
            )
          }}
        />
      </View>
    )
  }
}

export default GamePage

const styles = StyleSheet.create({
  tileIdContainer: {
    backgroundColor: COLOR,
    width: '20%',
    borderRadius: 9,
    paddingVertical: 20,
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
