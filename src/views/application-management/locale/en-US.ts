export default {
  'applications.applications.menu': 'Applications',
  'applications.applications.create': 'New Application',
  'applications.applications.edit': 'Edit Application',
  'applications.applications.secret': 'Secrets',
  'applications.applications.secret.holder': 'please enter a secret',
  'applications.applications.configuration.create': 'Add Module',
  'applications.applications.table.name': 'Application',
  'applications.applications.table.module': 'Module',
  'applications.applications.table.service': 'Services',
  'applications.applications.table.status': 'Status',
  'applications.applications.table.type': 'Type',
  'applications.applications.table.content': 'Content',
  'applications.applications.table.target': 'Target',
  'applications.applications.table.instance': 'Instances',
  'applications.applications.table.holder': 'please enter an application',
  'applications.applications.project.holder': 'please select a project',
  'applications.applications.form.name': 'Name',
  'applications.applications.form.label': 'Labels',
  'applications.applications.form.key': 'Key',
  'applications.applications.form.value': 'Value',
  'applications.applications.detail.configuration': 'Configuration',
  'applications.applications.form.description': 'Description',
  'applications.applications.rule.name': 'name is required',
  'applications.module.rule.name': 'name is required',
  'applications.applications.rule.allName':
    'consists of lowercase letters, numbers or "-", starts with a letter and ends with a letter or number',
  'applications.module.name.tips':
    'consists of letters, numbers, underscores, cannot start with a number',
  'applications.module.rule.name.tips':
    'consisting of letters, numbers, and underscores, and cannot start with a number',
  'applications.module.title.edit': 'Edit Module',
  'applications.module.title.view': 'Module Details',
  'applications.module.title.new': 'Add Module',
  'applications.applications.table.template': 'Generate a template',
  'applications.applications.table.currentval': 'Current Value',
  'applications.applications.table.recommendation': 'Recommendation',
  'applications.applications.container.holder': 'please select a container',
  'applications.applications.detail.createInstance':
    'Create Application Instance',
  'applications.applications.detail.env': 'Environment',
  'applications.applications.detail.basic': 'Basic Information',
  'applications.applications.title.edit': 'Edit Application',
  'applications.applications.title.view': 'Application Details',
  'applications.applications.title.clone': 'Clone Application',
  'applications.applications.detail.info': 'Application Information',
  'applications.applications.module.delete': `1. May affect the upgrade of deployed instances
    2. May affect resource cleanup when the deployed instance is deleted`,
  'applications.applications.instance.add': 'Add Application Instance',
  'applications.applications.instance.create': 'Add Instance',
  'applications.applications.instance.deleteTips': 'Clean up all resources',
  'applications.applications.instance.upgrade': 'Upgrade Instance',
  'applications.applications.instance.application': 'Application',
  'applications.applications.instance.status': 'Deployment Status',
  'applications.applications.instance.history': 'History Revisions',
  'applications.applications.instance.accessUrl': 'Access URL',
  'applications.applications.instance.resource': 'Resource Information',
  'applications.applications.instance.resource.tips':
    'When the connector of the environment is customized, the resources and outputs of the instance are static data, which will be updated when the instance is upgraded',
  'applications.applications.instance.endpoint': 'EndPoint',
  'applications.applications.instance.log': 'Logs',
  'applications.applications.instance.value': 'Value',
  'applications.applications.instance.cloneName':
    'please enter a new instance name',
  'applications.applications.instance.clonetitle': 'Clone Instance ({from})',
  'applications.applications.logs.live': 'Running Logs',
  'applications.instance.rule.env': 'the deployment environment is required',
  'applications.instance.env.tips':
    'environments without added connectors are not available',
  'applications.instance.tab.resource': 'Resources',
  'applications.instance.tab.resourceName': 'Resource Name',
  'applications.instance.tab.log': 'Logs',
  'applications.instance.tab.term': 'Terminal',
  'applications.instance.tab.output': 'Outputs',
  'applications.instance.basic.title': 'Instance Information',
  'applications.applications.history.version': 'Version',
  'applications.applications.history.operator': 'Operator',
  'applications.applications.history.clone': 'Clone',
  'applications.applications.history.rollbackapp': 'Application Rollback',
  'applications.applications.history.rollbackinstance': 'Instance Rollback',
  'applications.applications.history.deploymentTime': 'Deployment Time',
  'applications.applications.history.rollback': 'Rollback',
  'applications.applications.history.detail': 'Revision Details',
  'applications.applications.history.running': 'Deployment details',
  'applications.applications.history.diff.title':
    'Comparison between the current version and the latest version configuration',
  'applications.applications.history.diff.remove':
    'marker as the latest version configuration',
  'applications.applications.history.diff.add':
    'marker as current version configuration',
  'applications.applications.logs.holder': 'please select an object',
  'applications.applications.modules.title': 'Modules',
  'applications.applications.labels.title': 'Add labels',
  'applications.applications.rules.modules': 'module is required',
  'applications.applications.rules.versions': 'version is required',
  'applications.applications.modules.tips': 'Required for new applications',
  'applications.applications.modules.params.title':
    "To use secrets, variables, or related attributes in the same application module, here's how:",
  'applications.applications.modules.params.tips1': `1. Use the secret: you can enter {'$'}{'{'}secret.secretName{'}'} in the input box`,
  'applications.applications.modules.params.tips2': `2. Use variables: you can enter {'$'}{'{'}var.variableKey{'}'} in the input box`,
  'applications.applications.modules.params.tips3': `3. Use the attributes in the module: you can enter {'$'}{'{'}module.moduleName.attributeName{'}'} in the input box`,
  'applications.applications.rule.modules.name': 'exists with the same name',
  'applications.applications.variables.title': 'Variables',
  'applications.applications.variables.button': 'Add a variable',
  'applications.applications.variables.label': 'Variable Name',
  'applications.applications.modules.button': 'Add a module',
  'applications.applications.button.upgrade': 'Upgrade',
  'applications.workflows.menu': 'Workflows',
  'applications.workflows.create': 'New Pipeline',
  'applications.projects.menu': 'Projects',
  'applications.projects.create': 'New Project',
  'applications.projects.edit': 'Edit Project',
  'applications.projects.table.name': 'Project',
  'applications.projects.search.holder': 'please enter a project',
  'applications.projects.form.label': 'Label{index}',
  'applications.projects.rule.name': 'Name is required',
  'applications.secret.create': 'New Secret',
  'applications.secret.rules.value': 'content is required',
  'applications.secret.name.tips':
    'consists of letters, numbers, underscores, cannot start with a number',
  'applications.secret.form.name': 'Content',
  'applications.secret.form.tips': `The function of the secret is to use it when configuring the relevant parameters in the module when creating the application. Project secret are used only in apps for the specified project. Useage: Enter {'$'}<span></span>{'{'}secret.secretName{'}'} in the input box`,
  'applications.endpoint.access': 'Access Points'
};
