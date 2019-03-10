import React, { Component } from 'react'

export default class Wiki extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            remainingWords: [],
            wantedContent: ""
        })
    }

    componentDidMount() {
        this.renderText()
    }
    // TODO: fix the wiki, to search for what you entered....
    renderText = () => {
        const body = { method: 'GET', dataType: 'json', mode: 'cors', cache: 'default' };
        fetch('https://en.wikipedia.org/w/api.php?action=query&origin=*&list=search&srsearch=Edvard%20Grieg&titles=Edvard%20Grieg&prop=revisions&rvprop=content&utf8=&format=json', body)
            // https://no.wikipedia.org/w/api.php?format=json&action=query&titles=Andre_verdenskrig&prop=revisions&rvprop=content
            .then(response => response.json())
            .then(json => {
                console.log(json.query)
                const page = json.query.pages
                const pageId = Object.keys(page)[0]
                console.log(pageId)
                const rawContent = page[pageId].revisions[0]['*']
                const content = rawContent.replace(/[&\/\\#+()$~%'":*?[[<>{}[]/g, '')
                const content1 = content.split("\n")  // /\s+/g)
                console.log(rawContent)
                console.log(content)
                console.log(content1)
                this.wiki = content1[25]
                console.log(this.wiki)
                this.setState({
                    remainingWords: content1[25].split(' '),

                })
                console.log(this.state.remainingWords)

                this.props.set_content(this.state.remainingWords)
            })
            .catch(err => {
                console.log(err)
            })

        // const response = await fetch(new URL('http://www.example.com/démonstration.html'));

    }

    handleChange = e => {
        this.setState({ wantedContent: e.target.value })
        console.log(this.state.wantedContent)
    }

    handleSubmit = () => {
        this.renderText()
        this.props.want_to_start()
    }

    render() {
        return (
            <div>
                {/* <p style={{ fontweight: "bold" }}> Is there somethong you want to write about:</p>
                <form onSubmit={this.handleSubmit}>
                    <input
                        onChange={this.handleChange}
                        value={this.state.wantedContent}
                        autoFocus />
                </form> */}
            </div>
        )
    }
}
