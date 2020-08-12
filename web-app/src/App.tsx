import React, { Component, useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Header, Icon, List } from "semantic-ui-react";

class App extends Component {
  state = {
    values: [],
  };

  componentDidMount() {
    axios.get("http://localhost:5000/api/values").then((response) => {
      this.setState({
        values: response.data,
      });
    });
  }

  render() {
    return (
      <div>
        <Header as="h2">
          <Icon name="users" />
          <Header.Content>Reactivities</Header.Content>
        </Header>
        <List>
          {this.state.values.map((value: any) => (
            <List.Item key={value.id}>{value.name}</List.Item>
          ))}
        </List>
      </div>
    );
  }
}


// *** functional component version *** ///

// function App() {
//   const [values, setValues] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/values").then((response) => {
//       setValues(response.data);
//     });
//   });

//   return (
//     <div>
//         <Header as="h2">
//           <Icon name="users" />
//           <Header.Content>Reactivities</Header.Content>
//         </Header>
//         <List>
//           {values.map((value: any) => (
//             <List.Item key={value.id}>{value.name}</List.Item>
//           ))}
//         </List>
//       </div>
//   );
// }

export default App;
