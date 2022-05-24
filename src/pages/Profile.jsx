import React from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    waiting: false,
    user: '',
  };

  componentDidMount() {
    this.loadingHeader();
  }

  loadingHeader = async () => {
    this.setState({ waiting: true });
    const userName = await getUser();
    this.setState({ waiting: false, user: userName });
  };

  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <h1>Profile</h1>
      </div>
    );
  }
}

export default Profile;
