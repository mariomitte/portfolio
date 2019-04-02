import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FirebaseContext } from '../../Firebase'
import { withFirebase } from '../../Firebase/context'
import { FaStar } from 'react-icons/fa';

// const MyStars = ({ children }) => (
//   <ParallaxLayer offset={0} speed={0.4}>
//     <React.Fragment>
//       <div style={{ position: 'absolute', bottom: '100px', left: '100px', display: 'flex', flexDirection: 'column' }}>
//         {children}
//       </div>
//     </React.Fragment>
//   </ParallaxLayer>
// )

class Star extends React.Component {
  state = {
    loading: false,
    count: "",
    total: "",
    starName: "",
    starValue: 0,
  }

  componentDidMount() {
    this.setState({ loading: true });
    // console.log(this.props.firebase.stars())
    let summed = 0

    this.props.firebase.stars().once('value', snapshot => {
      const object = snapshot.val()

      if(object) {
        // const star = Object.keys(object).map(key => ({
        //   ...object[key],
        //   uid: key,
        // }))
        const length = Object.keys(object).length
        for (var key in object) {
          summed += parseInt(object[key].value)
        }

        this.setState({
          count: length,
          total: summed,
          loading: false,
        });
      } else {
        this.setState({ count: null, total: 0, loading: false });
      }
    })
  }

  componentWillUnmount() {
    this.props.firebase.star().off();
  }

  onChangeName = event => {
    this.setState({ starName: event.target.value });
  };

  onChangeValue = () => {
    this.setState( prevState => ({ starValue: prevState.starValue === 5 ? 5 : prevState.starValue + 1 }));
  };

  onCreateStar = event => {
    this.props.firebase.star().push({
      uid: this.state.starName,
      value: this.state.starValue,
    });

    this.setState({ starName: '', starValue: '' });

    this.props.onModal()

    event.preventDefault();
  };

  render() {
    const { loading, count, total, starName, starValue } = this.state
    const { modal, onModal } = this.props
    // <h1>Stars: { stars[0].value }</h1>
    console.log(starValue)

    return (
      <React.Fragment>
        {modal && <Stats>
          <Box>
            <span style={{ marginBottom: '2rem' }}>Show your support giving me some stars!</span>
            <span>{starValue}</span>
            <FaStar style={{ cursor: 'pointer', margin: 0, padding: 0 }} color="yellow" size="60%" onClick={onModal} onClick={this.onChangeValue} />
            <span>+{total} | { count }</span>
            <form style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem' }} onSubmit={this.onCreateStar}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={starName}
                onChange={this.onChangeName}
              />
              <button type="submit">Send</button>
            </form>
          </Box>
        </Stats>}
      </React.Fragment>
    )
  }
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50%;
`;

const Stats = styled.div`
  position: absolute;
  z-index: 999;
  left: 50px;
  top: 0;
  bottom: 52px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60%;
  height: 100%;
  border: 0;

  @media (max-width: 700px) {
    left: 10px;
  }
`;

export default withFirebase(Star);
