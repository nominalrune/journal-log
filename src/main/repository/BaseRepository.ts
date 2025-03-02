import { PrismaClient, type Prisma } from '@prisma/client';
import { NewUserType } from '../../renderer/features/users/schema/NewUserSchema';
import { EditUserType } from '../../renderer/features/users/schema/EditUserSchema';

const prisma = new PrismaClient();
type A = "user" | "project" | "log" | "task";
class Query<T extends "user"> {
	entityName: T;
	_where: Prisma.UserWhereInput = {};
	_orderBy: Prisma.UserOrderByWithRelationInput = {};
	_select: Prisma.UserSelect = {};
	_limit: number = 0;
	_offset: number = 0;
	constructor(entityName: T) {
		this.entityName = entityName;
	}

	where(query: Prisma.UserWhereInput) {
		function array(item: undefined | object | object[]) {
			return Array.isArray(item) ? item : item ? [item] : [];
		}
		this._where = {
			AND: [
				...array(this._where.AND),
				...array(query.AND)
			],
			OR: [
				...array(this._where.OR),
				...array(query.OR)
			],
			NOT: [
				...array(this._where.NOT),
				...array(query.NOT)
			],
			id: query.id,
			email: query.email,
			name: query.name,
			projects: query.projects,
			tasks: query.tasks,
			logs: query.logs,
		};
		return this;
	}
	orderBy(query: any) {
		this._orderBy = query;
		return this;
	}
	select(columns: string[]) {
		this._select = columns;
		return this;
	}
	limit(qty: number) {
		this._limit = qty;
		return this;
	}
	offset(): this {
		this._offset = this._offset + 1;
		return this;
	}
	async get() {
		const result = await prisma[this.entityName].findMany({
			where: this._where.length ? { AND: this._where } : undefined,
			orderBy: this._orderBy,
			select: this._select.length ? this._select.reduce((acc, col) => ({ ...acc, [col]: true }), {}) : undefined,
			take: this._limit || undefined,
			skip: this._offset || undefined,
		});
		return result;
	}
	async find(id: number) {
		return await prisma[this.entityName].findUnique({
			where: { id, AND: this._where.length ? { AND: this._where } : undefined },
			orderBy: this._orderBy,
			select: this._select.length ? this._select.reduce((acc, col) => ({ ...acc, [col]: true }), {}) : undefined,
		});
	}
	async delete() {
		return await prisma[this.entityName].deleteMany({
			where: this._where.length ? { AND: this._where } : undefined,
		});
	}
}

class BaseRepository<T extends "user" | "project" | "log" | "task", NewType, EditType> extends Query<T> {
	constructor(entityName: T) {
		super(entityName);
	}

	async create(data: NewType): Promise<NewType> {
		return await prisma[this.entityName].create({ data });
	}

	async getFirst(query: any) {
		return await prisma.user.findUnique({ where: { email: query.email } });
	}

	async updateUser(id: number, data: EditType): Promise<EditType> {
		return await prisma.user.update({ where: { id }, data });
	}

	async deleteUser(id: number): Promise<EditType> {
		return await prisma.user.delete({ where: { id } });
	}
}

export default new BaseRepository<"user", NewUserType, EditUserType>("user");
