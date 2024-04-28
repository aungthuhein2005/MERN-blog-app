import SectionTitle from '../Components/SectionTitle'
import ItemList from '../Components/ItemList'

function Search(props) {
    return (
        <div className='lg:px-20 pb-12'>
            <SectionTitle title="Search Result" />
            {props.search === '' ? <h1 className='text-center text-2xl text-gray-600 lg:mb-60'>No Result</h1> : 
            <div>
                <ItemList data={props.search}/>
            </div>}
            
        </div>
    )
}

export default Search
