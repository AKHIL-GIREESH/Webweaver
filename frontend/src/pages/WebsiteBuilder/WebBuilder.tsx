// import './App.css'
import CommunityComponentsProvider from '@/providers/communityComponentsProvider'
import Playground from '../../components/forWeb/playground'
import Sidebar from '../../components/forWeb/sidebar'
import Treee from '../../components/forWeb/treee'
import EditorProvider from '../../providers/editorProvider'
import SideBarSelectionProvider from '../../providers/sideBarSelectionProvider'
import WebBuilderSelectionProvider from '../../providers/webBuilderSelectionProvider'

function WebBuilder() {

  return (
    <CommunityComponentsProvider>
      <EditorProvider>
        <WebBuilderSelectionProvider>
          <SideBarSelectionProvider>
            <div className='flex bg-[#242424] text-white'>
              <Treee />
              <Playground />
              <Sidebar />
            </div>
          </SideBarSelectionProvider>
        </WebBuilderSelectionProvider>
      </EditorProvider>
    </CommunityComponentsProvider>
  )
}

export default WebBuilder
