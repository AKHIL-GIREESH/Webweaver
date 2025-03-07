// import './App.css'
import Playground from '../src/components/playground'
import Sidebar from '../src/components/sidebar'
import Treee from '../src/components/treee'
import EditorProvider from '../src/providers/editorProvider'
import SideBarSelectionProvider from '../src/providers/sideBarSelectionProvider'
import WebBuilderSelectionProvider from '../src/providers/webBuilderSelectionProvider'

function WebBuilder() {

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

export default WebBuilder
