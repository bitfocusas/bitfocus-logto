import { type Optional } from '@silverhand/essentials'
import type { TFuncKey } from 'i18next'
import type { FC, ReactNode } from 'react'

import BarGraph from '@/assets/icons/bar-graph.svg?react'
import Bolt from '@/assets/icons/bolt.svg?react'
import Box from '@/assets/icons/box.svg?react'
import Connection from '@/assets/icons/connection.svg?react'
import Gear from '@/assets/icons/gear.svg?react'
import Hook from '@/assets/icons/hook.svg?react'
import JwtClaims from '@/assets/icons/jwt-claims.svg?react'
import Key from '@/assets/icons/key.svg?react'
import List from '@/assets/icons/list.svg?react'
import OrganizationTemplate from '@/assets/icons/organization-template-feature.svg?react'
import Organization from '@/assets/icons/organization.svg?react'
import UserProfile from '@/assets/icons/profile.svg?react'
import ResourceIcon from '@/assets/icons/resource.svg?react'
import Role from '@/assets/icons/role.svg?react'
import SecurityLock from '@/assets/icons/security-lock.svg?react'
import Security from '@/assets/icons/security.svg?react'
import EnterpriseSso from '@/assets/icons/single-sign-on.svg?react'
import Web from '@/assets/icons/web.svg?react'
import { isCloud } from '@/consts/env'

const BUTTONS_HIDDEN = true

type SidebarItem = {
	Icon: FC
	title: TFuncKey<'translation', 'admin_console.tabs'>
	isHidden?: boolean
	modal?: (isOpen: boolean, onCancel: () => void) => ReactNode
	externalLink?: string
}

type SidebarSection = {
	title: TFuncKey<'translation', 'admin_console.tab_sections'>
	isHidden?: boolean
	items: SidebarItem[]
}

const findFirstItem = (sections: SidebarSection[]): Optional<SidebarItem> => {
	for (const section of sections) {
		const found = section.items.find((item) => !item.isHidden)

		if (found) {
			return found
		}
	}
}

export const useSidebarMenuItems = (): {
	sections: SidebarSection[]
	firstItem: Optional<SidebarItem>
} => {
	const allSections: SidebarSection[] = [
		{
			title: 'overview',
			isHidden: BUTTONS_HIDDEN,
			items: [
				{
					Icon: Bolt,
					title: 'get_started',
					isHidden: BUTTONS_HIDDEN,
				},
				{
					Icon: BarGraph,
					title: 'dashboard',
					isHidden: BUTTONS_HIDDEN,
				},
			],
		},
		{
			title: 'authentication',
			items: [
				{
					Icon: Box,
					title: 'applications',
					isHidden: BUTTONS_HIDDEN,
				},

				{
					Icon: Web,
					title: 'sign_in_experience',
				},
				{
					Icon: SecurityLock,
					title: 'mfa',
				},
				{
					Icon: Connection,
					title: 'connectors',
				},
				{
					Icon: EnterpriseSso,
					title: 'enterprise_sso',
				},
				{
					Icon: Security,
					title: 'security',
				},
			],
		},
		{
			title: 'authorization',
			isHidden: BUTTONS_HIDDEN,
			items: [
				{
					Icon: ResourceIcon,
					title: 'api_resources',
					isHidden: BUTTONS_HIDDEN,
				},
				{
					Icon: Role,
					title: 'roles',
					isHidden: BUTTONS_HIDDEN,
				},
				{
					Icon: OrganizationTemplate,
					title: 'organization_template',
					isHidden: BUTTONS_HIDDEN,
				},
			],
		},
		{
			title: 'users',
			isHidden: BUTTONS_HIDDEN,
			items: [
				{
					Icon: Organization,
					title: 'organizations',
					isHidden: BUTTONS_HIDDEN,
				},
				{
					Icon: UserProfile,
					title: 'users',
					isHidden: BUTTONS_HIDDEN,
				},
			],
		},
		{
			title: 'developer',
			items: [
				{
					Icon: Key,
					title: 'signing_keys',
					isHidden: BUTTONS_HIDDEN,
				},
				{
					Icon: JwtClaims,
					title: 'customize_jwt',
				},
				{
					Icon: Hook,
					title: 'webhooks',
					isHidden: BUTTONS_HIDDEN,
				},
				{
					Icon: List,
					title: 'audit_logs',
					isHidden: BUTTONS_HIDDEN,
				},
			],
		},
		{
			title: 'tenant',
			isHidden: !isCloud || BUTTONS_HIDDEN,
			items: [
				{
					Icon: Gear,
					title: 'tenant_settings',
					isHidden: BUTTONS_HIDDEN,
				},
			],
		},
	]

	const enabledSections = allSections.filter((section) => !section.isHidden)

	return { sections: enabledSections, firstItem: findFirstItem(enabledSections) }
}
