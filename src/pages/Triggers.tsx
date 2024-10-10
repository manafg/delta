import { useEffect, useState } from 'react';
import { DetailsList, IColumn, PrimaryButton, Stack, Text } from '@fluentui/react';
import { postJobsList } from '../api/jobsListing';

function Triggers() {
  const [jobs, setJobs] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    postJobsList(pageSize, pageNumber)
      .then(response => {
        setJobs(response.items);
        setTotalCount(response.totalCount);
      })
      .catch(console.error);
  }, [pageSize, pageNumber]);

  const columns: IColumn[] = [
    { key: 'column1', name: 'Job Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column2', name: 'Triggered By', fieldName: 'triggeredBy', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column3', name: 'Creator Name', fieldName: 'creatorName', minWidth: 100, maxWidth: 200, isResizable: true },
  ];

  const totalPages = Math.ceil(totalCount / pageSize);

  const handleNextPage = () => {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <div>
      <DetailsList
        items={jobs}
        columns={columns}
        setKey="set"
        layoutMode={0}
        selectionPreservedOnEmptyClick={true}
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
      />
      <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
        <PrimaryButton onClick={handlePreviousPage} disabled={pageNumber === 1}>
          Previous
        </PrimaryButton>
        <Text>{`Page ${pageNumber} of ${totalPages}`}</Text>
        <PrimaryButton onClick={handleNextPage} disabled={pageNumber === totalPages}>
          Next
        </PrimaryButton>
      </Stack>
    </div>
  );
}

export default Triggers;
