import React from 'react'

export default function WhatsHappening() {
    return (
        <div style={{backgroundColor: "rgba(255,255,255,0.10)"}} className="mt-5 px-2 py-3" id="whats-happening-container">
            <h3 className="bg-transparent">What's happening</h3>
            <ul className="text-start bg-transparent p-1">
                <li className="list-unstyled font-weight-bold bg-transparent whats-happening-item">
                    <p className="bg-transparent">Style - 1 hour ago</p>
                    <h5 className="bg-transparent">Eyeball hair transplants are the future</h5>
                    <p className="bg-transparent">Trending with <a href="#" className="bg-transparent">The Hair Goblins</a></p>
                </li>
                <li className="list-unstyled font-weight-bold bg-transparent whats-happening-item mt-4">
                    <p className="bg-transparent">Sports - 13 hours ago</p>
                    <h5 className="bg-transparent">New rules including legal interference by fans coming to the NFL</h5>
                    <p className="bg-transparent">Trending with <a href="#" className="bg-transparent">Madden 2026</a></p>
                </li>
                <li className="list-unstyled font-weight-bold bg-transparent whats-happening-item mt-4">
                    <p className="bg-transparent">Science and Technology - 21 hours ago</p>
                    <h5 className="bg-transparent">NASA astronauts land on Mars only to find a Barbie girl living in a Barbie world</h5>
                    <p className="bg-transparent">Trending with <a href="#" className="bg-transparent">Life in plastic, it's fantastic</a></p>
                </li>
            </ul>
        </div>
    )
}
