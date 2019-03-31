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
  }

  componentDidMount() {
    this.setState({ loading: true });
    // console.log(this.props.firebase.stars())
    let summed = 0

    this.props.firebase.stars().on('value', snapshot => {
      const object = snapshot.val()
      // console.log("-- Stars object --", object)

      if(object) {
        // const star = Object.keys(object).map(key => ({
        //   ...object[key],
        //   uid: key,
        // }))
        const length = Object.keys(object).length
        for (var key in object) {
          summed += object[key].value
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

  render() {
    const { loading, count, total } = this.state
    const { modal } = this.props
    // <h1>Stars: { stars[0].value }</h1>

    return (
      <React.Fragment>
        {modal && <Stats onClick={this.toggle}>
          <Box>
            <span>{ count }</span>
            <FaStar color="yellow" size="100%" />
            <span>+{total}</span>
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
  height: 60%;
`;

const Stats = styled.div`
  cursor: pointer;
  position: absolute;
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
`;

export default withFirebase(Star);
