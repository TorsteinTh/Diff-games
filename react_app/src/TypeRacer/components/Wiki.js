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
        if (this.state.wantedContent === "") {
            this.renderRandom()
        } else {
            this.renderRandom() ///////////
        }
    }
    // TODO: fix the wiki, to search for what you entered....
    // api.php?action=parse&text={{Project:Sandbox}}&contentmodel=wikitext
    renderRandom = () => {
        fetch('https://en.wikipedia.org/w/api.php?action=query&text={{Project:Sandbox}}&contentmodel=wikitext&generator=random&prop=revisions&origin=*&rvprop=content&format=json')
            .then(response => response.json())
            .then(json => {
                console.log(json.query)
                const page = json.query.pages
                const pageId = Object.keys(page)[0]
                const rawContent = page[pageId].revisions[0]['*']
                const content = rawContent.replace(/[&\\/\\#+()$~%'":*?|[[<>{}[]/g, '')
                const content1 = content.split("\n")  // /\s+/g)
                console.log(rawContent)
                console.log(content)
                console.log(content1)
                if (content1.length < 10) {
                    this.renderRandom()
                }
                var i = 5
                while (content1[i] === "" || content1[i].length < 10) {
                    if (content1[i] === undefined || i > 1000) {
                        this.renderRandom()
                        return
                    }
                    i++
                }
                this.wiki = content1[i]

                console.log(this.wiki)
                this.setState({
                    remainingWords: content1[i].split(' '),

                })
                console.log(this.state.remainingWords)

                this.props.set_content(this.state.remainingWords)
            })
            .catch(err => {
                console.log(err)
            })


    }

    renderText = search_word => {
        const URL = 'https://en.wikipedia.org/w/api.php?action=query&origin=*&list=search&prop=revisions&rvprop=content&utf8=&format=json'
        const words = search_word.split("\n")
        const search_word_with = ""
        const new_search_words = words.map(e =>
            e + "%20"
        )
        console.log(new_search_words)
        console.log(search_word_with)
        fetch(URL + new_search_words)
            // https://en.wikipedia.org/w/api.php?action=query&origin=*&list=search&srsearch=Edvard%20Grieg&titles=Edvard%20Grieg&prop=revisions&rvprop=content&utf8=&format=json')
            // https://no.wikipedia.org/w/api.php?format=json&action=query&titles=Andre_verdenskrig&prop=revisions&rvprop=content
            .then(response => response.json())
            .then(json => {
                console.log(json.query)
                const page = json.query.pages
                const pageId = Object.keys(page)[0]
                const rawContent = page[pageId].revisions[0]['*']
                const content = rawContent.replace(/[&\\/\\#+()$~%'":*?[[<>{}[]/g, '')
                const content1 = content.split("\n")  // /\s+/g)
                console.log(rawContent)
                console.log(content)
                console.log(content1)
                this.wiki = content1[16]
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

    handleSubmit = e => {
        e.preventDefault()
        if (this.state.wantedContent === "") {
            this.renderRandom()
        } else {
            this.renderRandom() ///////////this.state.wantedContent
        }
        this.props.want_to_start()
    }

    render() {
        return (
            <div>
                <p> Is there somethong you want to write about:</p>
                <form onSubmit={this.handleSubmit}>
                    <input
                        onChange={this.handleChange}
                        value={this.state.wantedContent}
                        autoFocus />
                </form>
            </div>
        )
    }
}
