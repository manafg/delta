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
          schema: yup.object().shape({
            type: yup.string().oneOf(['struct']).optional(),
            fields: yup.array().of(
              yup.object().shape({
                name: yup.string().required(),
                type: yup.string().oneOf(['string', 'integer', 'double', 'timestamp' , 'boolean']).required(),
              })
            ).required(),
          }),
        }),
    }),
  []);
};

const useDefaultValues = (): any => ({
  options: {
    schema: {
        type: 'struct',
        fields: [],
      },
    },
});

function useAddFieldsForm(nodeId: string, props?: UseFormProps<FileReaderData>) {
  const schema = useSchema();
  const defaultValues = useDefaultValues();
  const nodeData:any = useNodesData(nodeId?.toString() ?? '');

  const form = useForm<any>({
    mode: 'all',
    resolver: yupResolver(schema),
    shouldFocusError: false,
    defaultValues: nodeData?.data?.options?.schema?.fields ? nodeData?.data?.options : defaultValues,
    ...props,
  });

  return form;
}

export default useAddFieldsForm;
