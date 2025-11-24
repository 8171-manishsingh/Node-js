import LeftContainer from "./LeftContainer"
import RightContainer from "./RightContainer"

const HomeLayout = () => {
    return (
        <section className="h-200 w-400 p-5 bg-blue-200 rounded-2xl flex items-center justify-between">
            <LeftContainer />
            <p>Center</p>
            <RightContainer />
        </section>
    )
}

export default HomeLayout