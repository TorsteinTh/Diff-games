
import { Styles } from "@flow/styles";
import React, { Component } from "react";
import styled from "styled-components";

/* eslint-disable no-underscore-dangle */
const store = createStore(
    rootReducer /* preloadedState, */,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-enable */

class Game1 extends Component {
    constructor(props) {
        super(props);
        initFavorites(props.User.sub);
        store.dispatch(updateUser(props.User));
    }

    render() {
        return (
            <PageWrapper>
                <InboxScene>
                    Hei, inne i GAME 1
                    {/* <script src="./run"></script> */}
                </InboxScene>
            </PageWrapper>
        );
    }
}
export default Game1;

const InboxScene = styled.div`
  ${Styles.FullSizeGrid};
                grid-template-columns: minmax(230px, 1fr) minmax(300px, 1.5fr) minmax(610px, 3.5fr);
              `;
