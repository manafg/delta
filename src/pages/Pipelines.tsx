import PipelineHeader from '../components/piplines/PipelineHeader';
import PipelineListing from '../components/piplines/PipelienListing';
function Pipelines() {
  return (
    <>
      <PipelineHeader />
      <div style={{ margin: '20px' }}>
        <PipelineListing />
      </div>
    </>
  );
}

export default Pipelines;