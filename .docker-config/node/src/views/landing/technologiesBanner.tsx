import * as React from 'react';

export const TechnologiesBanner = () => {
	return (
		<div className="technologies-banner">
			<div className="tech-list">
				<div className="tech-item">
					<h3>Tools and Gizmos</h3>
					<div className="tech-image"></div>
					<p>Have a question on certain tools and utilities, but don't know what it is?</p>
					<br />
					<p>Our Tools and Gizmos section has you covered.</p>
				</div>
				<div className="tech-item">
					<h3>Programming Languages</h3>
					<div className="tech-image"></div>
					<p>See here to find out more about a specific programming language.</p>
					<br />
					<p>Understand a particular language, where and how it's used, and more.</p>
				</div>
				<div className="tech-item">
					<h3>Development Frameworks</h3>
					<div className="tech-image"></div>
					<p>Heard of a cool new framework or library, but just want to know what it means for you?</p>
					<br />
					<p>Let our <span>Development Frameworks</span> section put it all into context for you</p>
				</div>
			</div>
		</div>
	)
}