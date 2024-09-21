import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useForm, UseFormProps } from 'react-hook-form';
import * as yup from 'yup';
import { FileWriterData } from '../types';
import { useNodesData } from '@xyflow/react';

const useSchema = () => {
  return useMemo(() => 
    yup.object().shape({
      options: yup.object().shape({
        location: yup.object().shape({
          physical_path: yup.string().required('Physical path is required'),
          share_type: yup.string().oneOf(['smb', 'nfs'], 'Invalid share type'),
          authentication: yup.object().shape({
            authRequired: yup.boolean().nullable(),
            username: yup.string().when('$authRequired', ([authRequired]) => 
              authRequired ? yup.string().required('Username is required when authentication is enabled') : yup.string()
            ),
            password: yup.string().when('$authRequired', ([authRequired]) => 
              authRequired ? yup.string().required('Password is required when authentication is enabled') : yup.string()
            ),
          }),
        }),
        format: yup.string().oneOf(['csv', 'json', 'parquet'], 'Invalid format'),
        options: yup.object().shape({
          header: yup.string().oneOf(['true', 'false']),
          inferSchema: yup.string().oneOf(['true', 'false']),
        }),
        
      }),
      stream_options: yup.object().shape({
        enabled: yup.boolean().nullable(),
        maxFilesPerTrigger: yup.number().min(1, 'Must be at least 1').nullable(),
      }).nullable(),
    }),
  []);
};

const useDefaultValues = (): any => ({
  options: {
    location:{
      path: '',
      physical_path: '',
      share_type: 'smb',
      authentication: {
        authRequired: false,
        username: '',
        password: '',
      },
    },
    mode: "w",
    format: 'csv',
    options: {
      header: 'true',
      inferSchema: 'true',
    },
  },
  stream_options: {
    enabled: false,
    maxFilesPerTrigger: 1,
    timestamp_col: "event_time", 
  },
});

function useFileReaderForm(nodeId: string ,props?: UseFormProps<FileWriterData>) {
  const schema = useSchema();
  const defaultValues = useDefaultValues();
  const nodeData:any = useNodesData(nodeId?.toString() ?? '');
  const form = useForm<any>({
    mode: 'all',
    resolver: yupResolver(schema),
    shouldFocusError: false,
    defaultValues: nodeData?.data?.options?.location?.physical_path ? nodeData?.data : defaultValues ,
    ...props,
  });

  return form;
}

export default useFileReaderForm;
