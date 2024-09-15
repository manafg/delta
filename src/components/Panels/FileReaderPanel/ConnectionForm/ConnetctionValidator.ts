import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useForm, UseFormProps } from 'react-hook-form';
import * as yup from 'yup';
import { FileReaderData } from '../types';
import { useNodesData } from '@xyflow/react';

const useSchema = () => {
  return useMemo(() => 
    yup.object().shape({
      options: yup.object().shape({
        physical_path: yup.string().required('Physical path is required'),
        share_type: yup.string().oneOf(['smb', 'nfs'], 'Invalid share type'),
        format: yup.string().oneOf(['csv', 'json', 'parquet'], 'Invalid format'),
        options: yup.object().shape({
          header: yup.string().oneOf(['true', 'false']),
          inferSchema: yup.string().oneOf(['true', 'false']),
        }),
        authentication: yup.object().shape({
          authRequired: yup.boolean().nullable(),
          username: yup.string().when('$authRequired', ([authRequired]) => 
            authRequired ? yup.string().required('Username is required when authentication is enabled') : yup.string()
          ),
          password: yup.string().when('$authRequired', ([authRequired]) => 
            authRequired ? yup.string().required('Password is required when authentication is enabled') : yup.string()
          ),
        }).nullable(),
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
    path: '',
    physical_path: '',
    share_type: 'smb',
    format: 'csv',
    options: {
      header: 'true',
      inferSchema: 'true',
    },
    authentication: {
      authRequired: false,
      username: '',
      password: '',
    },
  },
  stream_options: {
    enabled: false,
    maxFilesPerTrigger: 1,
  },
});

function useFileReaderForm(nodeId: string ,props?: UseFormProps<FileReaderData>) {
  const schema = useSchema();
  const defaultValues = useDefaultValues();
  const nodeData:any = useNodesData(nodeId?.toString() ?? '');
  debugger
  const form = useForm<any>({
    mode: 'all',
    resolver: yupResolver(schema),
    shouldFocusError: false,
    defaultValues: nodeData?.data?.options?.physical_path ? nodeData?.data : defaultValues ,
    ...props,
  });

  return form;
}

export default useFileReaderForm;
