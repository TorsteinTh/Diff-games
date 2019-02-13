import React, { Component } from "react";
import styled from "styled-components";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap"
// import JSON

class TypeRacer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            started: false,
            typedWords: '',
            remainingWords: ["test", "hei", "på", "dere"],
            showText: ''
        };
    }
    textArray = ["Her skal texten ligge!! XD "]
    finishedWords = []
    totalTime = 0
    wiki = ''

    componentDidMount() {
        this.renderText()
    }
    handleClick = () => {
        this.setState({
            started: this.state.started ? false : true
        })
    }
    // https://en.wikipedia.org/w/api.php?action=view&format=json
    renderText = () => {
        const body = { method: 'GET', dataType: 'json', mode: 'cors', cache: 'default' };
        // const contentenPage = 'https://no.wikipedia.org/w/api.php?format=json&action=query&titles=Andre_verdenskrig&prop=links&rvprop=content'
        // fetch('https://no.wikipedia.org/w/api.php?action=opensearch&prop=revisions&format=json&origin=*&search=England', body)
        //     .then(response => response.json())
        //     .then(json => {
        //         this.wiki = json[3][0]
        //         console.log(this.wiki)
        //     })

        // fetch('https://no.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&origin=*&titles=England', body)
        //     .then(res => res.json)
        //     .then(json => {
        //         console.log(json)
        //     })



        fetch('https://en.wikipedia.org/w/api.php?action=query&origin=*&list=search&srsearch=Edvard%20Grieg&titles=Edvard%20Grieg&prop=revisions&rvprop=content&utf8=&format=json', body)
            // https://no.wikipedia.org/w/api.php?format=json&action=query&titles=Andre_verdenskrig&prop=revisions&rvprop=content
            .then(response => response.json())
            .then(json => {
                console.log(json.query)
                const page = json.query.pages
                const pageId = Object.keys(page)[0]
                console.log(pageId)
                const rawContent = page[pageId].revisions[0]['*']
                const content = rawContent.replace(/[&\/\\#+()$~%'":*?<>{}]/g, '')
                const content1 = content.split("\n")  // /\s+/g)
                console.log(rawContent)
                console.log(content)
                console.log(content1)
                this.wiki = content1[25]
                console.log(this.wiki)
                this.setState({
                    remainingWords: content1[25].split(' '),

                })
                this.setState({
                    showText: this.state.remainingWords.join(" ")
                })
                console.log(this.state.remainingWords)
            })
            .catch(err => {
                console.log(err)
            })

        // const response = await fetch(new URL('http://www.example.com/démonstration.html'));

    }
    handleText = e => {
        const word = e.target.value
        const lastChar = word[word.length - 1]
        if (lastChar === ' ') {
            console.log("typed: ", this.state.typedWords)
            console.log("remaining: ", this.state.remainingWords[0])
            if (word === this.state.remainingWords[0] + ' ') {
                this.finishedWords.push(this.state.remainingWords.shift())
                e.target.value = ''
                console.log("Riktig !!!!!!!!!!!")
            }
            console.log("test: ", this.finishedWords)
        }

    }
    // handleChange = e => {
    //     this.setState(
    //         { typedWords: e.target.value },
    //         this.handleText(e)
    //     )
    // }


    render() {
        return (
            <GameScreen>
                {!this.state.started && (
                    <Button bsStyle="success" onClick={this.handleClick}>Start Typeracer</Button>
                )}
                {this.state.started && (
                    <div>
                        <TextHolder>
                            {this.state.showText}
                        </TextHolder>
                        <FormGroup controlId="formControlsTextarea">
                            <ControlLabel>Write the text </ControlLabel>
                            <FormControl
                                componentClass="textarea"
                                placeholder="Enter here"
                                onChange={this.handleText}
                                value={this.state.typedwords}
                            />
                            {/* onFocus="true" */}
                        </FormGroup>
                    </div>)}
            </GameScreen >
        );
    }
}
export default TypeRacer;

const GameScreen = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
`;

const TextHolder = styled.div`
    display: flex;
    justify-content: center;  
`;