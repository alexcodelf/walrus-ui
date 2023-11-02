import { ConnectorType } from '@/views/operation-hub/connectors/config';

const KubernetesBU = {
  NamespaceSelect: 'NamespaceSelect',
  SecretSelect: 'SecretSelect',
  ConfigMapSelect: 'ConfigMapSelect',
  StorageClassSelect: 'StorageClassSelect'
};

const DockerBU = {
  ImageSelect: 'ImageSelect',
  ImageTagSelect: 'ImageTagSelect'
};

const AWSBU = {
  AWSRegion: 'AWSRegion',
  AWSInstanceType: 'AWSInstanceType'
};

const AliBU = {
  AliyunRegion: 'AliyunRegion',
  AliyunInstanceType: 'AliyunInstanceType'
};

const GitHubBU = {
  Repository: 'Repository'
};

export const BU = {
  CpuCore: 'CpuCore',
  Memory: 'Memory',
  Disk: 'Disk',
  ...DockerBU,
  ...KubernetesBU,
  ...AWSBU,
  ...AliBU,
  ...GitHubBU
};

export type BUType = (typeof BU)[keyof typeof BU];

export const CheckConnectorCatagory = (widget) => {
  if (KubernetesBU[widget]) {
    return ConnectorType.Kubernetes;
  }
  if (AWSBU[widget]) {
    return ConnectorType.AWS;
  }
  if (AliBU[widget]) {
    return ConnectorType.Alibaba;
  }
  if (GitHubBU[widget]) {
    return ConnectorType.Github;
  }
  return ConnectorType.Kubernetes;
};

export default {};
