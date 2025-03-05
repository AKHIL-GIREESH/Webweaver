import './App.css'
import Playground from './components/playground'
import Sidebar from './components/sidebar'
import Treee from './components/treee'
import EditorProvider from './providers/editorProvider'
import SideBarSelectionProvider from './providers/SideBarSelectionProvider'
import WebBuilderSelectionProvider from './providers/webBuilderSelectionProvider'

function App() {

  return (
    <EditorProvider>
      <WebBuilderSelectionProvider>
        <SideBarSelectionProvider>
          <div className='flex bg-[#242424] text-white'>
            <Treee/>
            <Playground/>
            <Sidebar/>
          </div>
        </SideBarSelectionProvider>
      </WebBuilderSelectionProvider>
    </EditorProvider>
  )
}

export default App
