import React, { Component } from 'react'

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="bg-dark p-4">
                        <div className="flex justify-center">
                            <a className="text-white text-4xl font-semibold no-underline">Job Management App</a>
                        </div>
                    </nav>
                </header>
            </div>
        )
        
        
        
        
        
        
    }
}

export default HeaderComponent