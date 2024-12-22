import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { DetailsList, 
    MessageBar, MessageBarType, DetailsListLayoutMode, IColumn, SelectionMode, Pivot, PivotItem, IconButton, ISelection, Selection, TextField } from '@fluentui/react';
import { fetchPipelineList } from '../../api/pilpelineListing';
import useDelete  from '../../api/delete';
import { useNavigate } from 'react-router-dom';

interface Pipeline {
    id: string;
    name: string;
    description: string;
    status: number;
    type: number;
    creationTime: string;
    lastModificationTime: string | null;
    creatorName: string;
}

const columns: IColumn[] = [
    { key: 'name', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'type', name: 'Pipeline type', fieldName: 'type', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'creationTime', name: 'Updated on', fieldName: 'creationTime', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'creatorName', name: 'Created by', fieldName: 'creatorName', minWidth: 100, maxWidth: 200, isResizable: true },
];

function PipelineListing() {
    const [pipelines, setPipelines] = useState<Pipeline[]>([]);
    const [filteredPipelines, setFilteredPipelines] = useState<Pipeline[]>([]);
    const [selectedKey, setSelectedKey] = useState<string>('drafts');
    const [searchText, setSearchText] = useState<string>('');
    const [selectedItems, setSelectedItems] = useState<Pipeline[]>([]);
    const { deleteRequest , isLoading , error } = useDelete();
    const [toast, setToast] = useState<{ message: string, type: MessageBarType } | null>(null);
    const navigate = useNavigate();
    const selection = useMemo(
        () =>
            new Selection({
                onSelectionChanged: () => {
                    setSelectedItems(selection.getSelection() as Pipeline[]);
                },
                selectionMode: SelectionMode.single,
                getKey: (item) => (item as Pipeline).id,
            }),
        []
    );
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [sortColumn, setSortColumn] = useState<string>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const loadPipelines = useCallback(async () => {
        const response = await fetchPipelineList({
            status: selectedKey === 'drafts' ? 0 : 9,
            maxResultCount: pageSize,
            skipCount: (currentPage - 1) * pageSize,
            sorting: "",//`${sortDirection}`,
            userName: '', // Add this line
            name: searchText
        });
        setPipelines(response.items);
        setFilteredPipelines(response.items);
    }, [selectedKey, currentPage, pageSize, sortColumn, sortDirection, searchText]);

    useEffect(() => {
        loadPipelines();
    }, [selectedKey, currentPage, sortColumn, sortDirection, loadPipelines]);

    useEffect(() => {
        const filtered = pipelines.filter(pipeline => pipeline.name.toLowerCase().includes(searchText.toLowerCase()));
        setFilteredPipelines(filtered);
    }, [searchText, pipelines]);

    useEffect(() => {
        if (error) {
            console.error(error);
        }
        setToast({ message: 'Could not delete pipeline', type: MessageBarType.error });

    }, [error]);

    const onLinkClick = (item?: PivotItem) => {
        setSelectedKey(item?.props.itemKey || 'drafts');
    };

    const handleRefresh = async () => {
        loadPipelines();
    };

    const handleDelete = async () => {
        if (selectedItems.length === 1) {
            const idToDelete = selectedItems[0].id;
            await deleteRequest(idToDelete);
            const remainingItems = pipelines.filter(pipeline => pipeline.id !== idToDelete);
            setPipelines(remainingItems);
            setFilteredPipelines(remainingItems);
            setToast({ message: 'Pipeline deleted successfully', type: MessageBarType.success });
        }
    };

    const handleSearchChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        setSearchText(newValue || '');
    };

    const handleItemClick = (item: Pipeline) => {
        navigate(`/create-pipeline/${item.id}`);
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleSortChange = (columnKey: string) => {
        if (sortColumn === columnKey) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(columnKey);
            setSortDirection('asc');
        }
    };

    return (
        <div>
            <h1>Pipeline Listing</h1>
            <Pivot selectedKey={selectedKey} onLinkClick={onLinkClick}>
                <PivotItem headerText="Pipeline drafts" itemKey="drafts">
                    <div style={{ marginBottom: 10 }}>
                        <IconButton iconProps={{ iconName: 'Refresh' }} onClick={handleRefresh} />
                        <IconButton iconProps={{ iconName: 'Delete' }} onClick={handleDelete} />
                        <TextField placeholder="Search by name" value={searchText} onChange={handleSearchChange} />
                    </div>
                    <DetailsList
                        items={filteredPipelines}
                        columns={columns.map(col => ({
                            ...col,
                            onColumnClick: () => handleSortChange(col.key)
                        }))}
                        setKey="id"
                        layoutMode={DetailsListLayoutMode.justified}
                        selectionMode={SelectionMode.single}
                        selection={selection}
                        onItemInvoked={handleItemClick}
                    />
                    {/* Pagination controls */}
                    <div>
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                        <span>Page {currentPage}</span>
                        <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                    </div>
                </PivotItem>
                <PivotItem headerText="Published pipelines" itemKey="published">
                    <div style={{ marginBottom: 10 }}>
                        <IconButton iconProps={{ iconName: 'Refresh' }} onClick={handleRefresh} />
                        <IconButton iconProps={{ iconName: 'Delete' }} onClick={handleDelete} />
                        <TextField placeholder="Search by name" value={searchText} onChange={handleSearchChange} />
                    </div>
                    <DetailsList
                        items={filteredPipelines}
                        columns={columns}
                        setKey="id"
                        layoutMode={DetailsListLayoutMode.justified}
                        selectionMode={SelectionMode.single}
                        selection={selection}
                        onItemInvoked={handleItemClick}
                    />
                </PivotItem>
            </Pivot>
        </div>
    );
}

export default PipelineListing;
