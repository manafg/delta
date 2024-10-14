import React , { useCallback} from 'react';
import { Stack, Text, Icon, IconButton } from '@fluentui/react';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { useNavigate } from 'react-router-dom';
import { createPipeline } from '../../api/newPipeline';
initializeIcons();

const PipelineHeader: React.FC = () => {
    const navigate = useNavigate();

    const handleClick = useCallback(async () => {
        const pipeline = await createPipeline();
        if (pipeline) {
            navigate(`/create-pipeline/${pipeline.id}`);
        }
    }, [navigate]);

    return (
        <Stack tokens={{ childrenGap: 20 }} styles={{ root: { padding: 20 } }}>
            <Text variant="xxLarge">New Pipeline</Text>
            <Text variant="medium">
                This low-code option uses existing prebuilt components and earlier dataset types (tabular, file), and is best suited for data processing and traditional machine learning tasks like regression and classification. This option continues to be supported but will not have any new components added.
            </Text>
            <Stack horizontal tokens={{ childrenGap: 20 }} horizontalAlign="space-between">
                <Stack
                    tokens={{ childrenGap: 10 }}
                    styles={{
                        root: {
                            width: '30%',
                            border: '1px solid #ccc',
                            borderRadius: 5,
                            padding: 20,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                        },
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                    onClick={handleClick}
                >
                    <IconButton iconProps={{ iconName: 'Add' }} styles={{ root: { fontSize: 40 } }} />
                    <Text>Create a new empty pipeline</Text>
                </Stack>
                <Stack
                    tokens={{ childrenGap: 10 }}
                    styles={{
                        root: {
                            width: '30%',
                            border: '1px solid #ccc',
                            borderRadius: 5,
                            padding: 20,
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                        },
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                >
                    <Icon iconName="Processing" styles={{ root: { fontSize: 40 } }} />
                    <Text>Extract Transform Load typical pipeline (ETL)</Text>
                </Stack>
                <Stack
                    tokens={{ childrenGap: 10 }}
                    styles={{
                        root: {
                            width: '30%',
                            border: '1px solid #ccc',
                            borderRadius: 5,
                            padding: 20,
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                        },
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                >
                    <Icon iconName="Money" styles={{ root: { fontSize: 40 } }} />
                    <Text>Real-time complex event processing Pipeline template</Text>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default PipelineHeader;