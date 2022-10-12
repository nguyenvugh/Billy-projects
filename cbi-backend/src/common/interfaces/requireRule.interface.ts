import { Subjects } from 'src/casl/casl-ability.factory'
import { Action } from 'src/common/enums/action.enum'

export interface RequiredRule {
	action: Action
	subject: Subjects
}
