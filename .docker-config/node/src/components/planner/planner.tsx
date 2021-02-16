import { TutorialCard } from '../tutorials/TutorialCard';
import { PaddedPage } from '../custom/paddedPage';

export const Planner = ({ tutorials }) => {
    return (
        <PaddedPage
            heading="Planner"
            subHeading="Here's where you'll find tutorials you've worked on."
        >
            <div className="planner">

                {/** Tutorials in-progress */}
                <div className="planner__section">
                    <h4>In-Progress</h4>
                    <div className="planner__tutorials">
                        {
                            tutorials.map((tutorial, index) =>
                                <TutorialCard
                                    tutorial={tutorial}
                                    key={`${tutorial.slug}__${index}`}
                                />
                            )
                        }
                    </div>
                </div>

                {/** Tutorials that have been completed */}
                <div className="planner__section">
                    <h4>Complete</h4>
                    <p>You haven't completed a tutorial yet!</p>
                </div>

            </div>
        </PaddedPage >
    )
};

