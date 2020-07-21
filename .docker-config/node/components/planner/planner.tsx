import { TutorialCard } from '../tutorials/TutorialCard';

export const Planner = ({ tutorials }) => {
    return (
        <div className="planner padded-page">
            <div className="padded-page__content">
                <h1>Planner</h1>
                <p>Here's where you'll find tutorials you've started</p>

                {/** Display the cards of enrolled tutorials */}
                <div className="planner__tutorials">
                    {tutorials.map((tutorial, index) =>
                        <TutorialCard
                            tutorial={tutorial}
                            key={`${tutorial.slug}__${index}`}
                        />
                    )}
                </div>

            </div>
        </div>
    )
};